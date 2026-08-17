/**
 * Printing adapter (client-side) — jsPDF label/albarán generation.
 * Isolates the jsPDF dependency so pages never touch window.jspdf or CDNs.
 */
import { jsPDF } from 'jspdf';

export interface ExpeditionLabel {
  nutcode: string;
  desc: string;
  qty: number;
  isPico?: boolean;
}

export function generateExpeditionLabelsPdf(labels: ExpeditionLabel[], filename: string): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a6' });
  let isFirstPage = true;

  for (const label of labels) {
    if (!isFirstPage) doc.addPage();
    isFirstPage = false;

    doc.setLineWidth(1);
    doc.rect(5, 5, 138, 95);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ESINSA GASKET - ETIQUETA EXPEDICIÓN', 74, 15, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(10, 20, 138, 20);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(label.nutcode, 10, 35);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(label.desc, 10, 45);
    doc.setFont('courier', 'normal');
    doc.setFontSize(30);
    doc.text(`*${label.nutcode}*`, 10, 65);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text(`CANT: ${label.qty}`, 10, 85);
    if (label.isPico) {
      doc.setFillColor(0, 0, 0);
      doc.rect(90, 75, 40, 15, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('PICO / EXTRA', 110, 85, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    }
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 95);
  }

  doc.save(filename);
}

export interface ShippingOrder {
  number: string;
  customer: string;
}

export function generateShippingLabelPdf(order: ShippingOrder, filename: string): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a6' });

  doc.setLineWidth(1);
  doc.rect(5, 5, 138, 95);

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ETIQUETA DE ENVÍO', 74, 20, { align: 'center' });

  doc.setLineWidth(0.5);
  doc.line(10, 25, 138, 25);

  doc.setFontSize(14);
  doc.text('REMITENTE:', 10, 35);
  doc.setFont('helvetica', 'normal');
  doc.text('ESINSA GASKET\nPol. Ind. Riu Clar\nTarragona, España', 10, 42);

  doc.setFont('helvetica', 'bold');
  doc.text('DESTINATARIO:', 70, 35);
  doc.setFont('helvetica', 'normal');
  doc.text(`${order.customer}\nDirección del cliente\nCiudad, País`, 70, 42);

  doc.line(10, 65, 138, 65);

  doc.setFont('courier', 'normal');
  doc.setFontSize(22);
  doc.text(`*${order.number}*`, 74, 80, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 95);

  doc.save(filename);
}

export interface AlbaranOrder {
  number: string;
  customer: string;
  amount: number;
}

export function generateAlbaranPdf(order: AlbaranOrder, filename: string): void {
  const doc = new jsPDF({ format: 'a4' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('ALBARÁN DE ENTREGA', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('ESINSA GASKET', 20, 40);
  doc.text('Pol. Ind. Riu Clar, Tarragona', 20, 46);

  doc.setFont('helvetica', 'bold');
  doc.text(`Cliente: ${order.customer}`, 120, 40);
  doc.text(`Nº Pedido: ${order.number}`, 120, 46);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 120, 52);

  doc.setLineWidth(0.5);
  doc.line(20, 60, 190, 60);

  doc.text('Descripción', 20, 70);
  doc.text('Cantidad', 120, 70);
  doc.text('Precio', 160, 70);

  doc.line(20, 72, 190, 72);

  doc.setFont('helvetica', 'normal');
  doc.text('Materiales de Sellado y Juntas (Varios)', 20, 82);
  doc.text('1 Lote', 120, 82);
  doc.text(`$${order.amount}`, 160, 82);

  doc.line(20, 92, 190, 92);
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL: $${order.amount}`, 160, 102);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Firma del receptor: _______________________', 20, 250);

  doc.save(filename);
}
