import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import json
import time
from collections import deque
import sys

class DeepWebScraper:
    def __init__(self, base_url, max_depth=10):
        self.base_url = base_url
        self.domain = urlparse(base_url).netloc
        self.max_depth = max_depth
        self.visited_urls = set()
        self.extracted_data = []

    def is_valid_url(self, url):
        parsed = urlparse(url)
        return bool(parsed.netloc) and bool(parsed.scheme)

    def classify_link(self, link):
        parsed = urlparse(link)
        if parsed.netloc == self.domain:
            return 'internal'
        return 'external'

    def scrape(self):
        queue = deque([(self.base_url, 0)])
        print(f"\n🚀 Iniciando escaneo profundo en: {self.base_url}")
        print("-" * 50)

        while queue:
            current_url, depth = queue.popleft()

            if depth > self.max_depth or current_url in self.visited_urls:
                continue

            self.visited_urls.add(current_url)
            print(f"[{depth}/{self.max_depth}] Extrayendo: {current_url}")

            try:
                headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
                response = requests.get(current_url, headers=headers, timeout=15)
                
                if response.status_code != 200 or 'text/html' not in response.headers.get('Content-Type', ''):
                    continue

                soup = BeautifulSoup(response.content, "html.parser")

                # 1. TEXTO
                for element in soup(["script", "style", "noscript", "svg"]):
                    element.extract()
                raw_text = soup.get_text(separator='\n', strip=True)
                
                # 2. IMÁGENES
                images = []
                for img in soup.find_all('img'):
                    src = img.get('src')
                    if src:
                        full_img_url = urljoin(current_url, src)
                        alt_text = img.get('alt', '')
                        images.append({"url": full_img_url, "alt": alt_text})

                # 3. ENLACES
                internal_links = []
                external_links = []
                
                for a_tag in soup.find_all('a'):
                    href = a_tag.get('href')
                    if href:
                        full_link_url = urljoin(current_url, href).split('#')[0]

                        if self.is_valid_url(full_link_url):
                            link_type = self.classify_link(full_link_url)
                            
                            if link_type == 'internal':
                                internal_links.append(full_link_url)
                                if full_link_url not in self.visited_urls:
                                    queue.append((full_link_url, depth + 1))
                            else:
                                external_links.append(full_link_url)

                # 4. GUARDAR
                page_data = {
                    "url": current_url,
                    "depth": depth,
                    "text_content": raw_text,
                    "images": [dict(t) for t in {tuple(d.items()) for d in images}],
                    "internal_links": list(set(internal_links)),
                    "outgoing_external_links": list(set(external_links))
                }
                
                self.extracted_data.append(page_data)
                time.sleep(1)

            except Exception as e:
                print(f"❌ Error extrayendo {current_url}: {e}")

        self.save_results()

    def save_results(self):
        output_file = "web_content_backup.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(self.extracted_data, f, ensure_ascii=False, indent=4)
        print("\n" + "=" * 50)
        print(f"✅ Scraping completado. Se han extraído {len(self.extracted_data)} páginas.")
        print(f"📁 Los resultados se han guardado en: {output_file}")
        print("=" * 50)

if __name__ == "__main__":
    try:
        # Preguntar la URL
        target_url = input("Introduce la URL de la web a escanear (ej. https://ejemplo.com): ").strip()
        
        # Validación básica de la URL
        if not target_url.startswith("http"):
            print("⚠️ La URL debe empezar por http:// o https://")
            sys.exit(1)

        # Preguntar la profundidad (con valor por defecto)
        depth_input = input("Introduce la profundidad máxima de clics [Por defecto: 10]: ").strip()
        
        # Si el usuario no introduce nada, usa 10, si no, convierte a entero
        max_depth = int(depth_input) if depth_input.isdigit() else 10

        # Ejecutar el scraper
        scraper = DeepWebScraper(base_url=target_url, max_depth=max_depth)
        scraper.scrape()
        
    except KeyboardInterrupt:
        print("\n\n🛑 Proceso cancelado por el usuario.")
        sys.exit(0)