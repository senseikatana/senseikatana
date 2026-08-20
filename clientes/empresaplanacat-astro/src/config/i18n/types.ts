export type Locale = "ca" | "es" | "en";

export interface CommonNav {
	services: string;
	locations: string;
	downloads: string;
	contact: string;
	bookNow: string;
}

export interface CommonLang {
	ca: string;
	es: string;
	en: string;
}

export interface CommonFooter {
	privacy: string;
	terms: string;
	cookies: string;
	contact: string;
	fleet: string;
	sitemap: string;
	copyright: string;
}

export interface Common {
	brand: string;
	nav: CommonNav;
	lang: CommonLang;
	phone: string;
	footer: CommonFooter;
}

export interface HomeScreen {
	label: string;
	desc: string;
}

export interface HomeScreens {
	routes: HomeScreen;
	locations: HomeScreen;
	discretionary: HomeScreen;
	variant1: HomeScreen;
	variant2: HomeScreen;
	mobile: HomeScreen;
	locationsMobile: HomeScreen;
	tracking: HomeScreen;
}

export interface Home {
	title: string;
	subtitle: string;
	screens: HomeScreens;
}

export interface RoutesHero {
	title: string;
	subtitle: string;
}

export interface RoutesSearch {
	title: string;
	originLabel: string;
	destinationLabel: string;
	dateLabel: string;
	timeLabel: string;
	originPlaceholder: string;
	destinationPlaceholder: string;
	anyTime: string;
	morning: string;
	afternoon: string;
	evening: string;
	direct: string;
	withTransfers: string;
	submit: string;
	disclaimer: string;
}

export interface RoutesResults {
	title: string;
	summaryLabel: string;
	directTitle: string;
	transfersTitle: string;
	hubLabel: string;
	legLabel: string;
	throughTitle: string;
	throughBadge: string;
	throughAtLabel: string;
	throughOriginHeader: string;
	throughConnectionHeader: string;
	throughWaitHeader: string;
	throughDepartHeader: string;
	throughDestinationHeader: string;
	firstDeparture: string;
	lastDeparture: string;
	departuresLabel: string;
	stopsLabel: string;
	downloadPdf: string;
	moreDepartures: string;
	emptyTitle: string;
	emptyBody: string;
	emptyHint: string;
	missingSelection: string;
	databaseError: string;
	searchingInfo: string;
}

export interface RoutesOrigins {
	barcelonaAirport: string;
	reusAirport: string;
	tarragona: string;
	salou: string;
	cambrils: string;
	portAventura: string;
}

export interface RoutesGroups {
	special: string;
	altCamp: string;
	baixCamp: string;
	baixEbre: string;
	baixPenedes: string;
	concaBarbera: string;
	montsia: string;
	priorat: string;
	riberaEbre: string;
	tarragones: string;
	terraAlta: string;
}

export interface RouteLineCard {
	route: string;
	stops: string;
	stopsNumber?: number | string;
	routeOrigin?: string;
	routeDestination?: string;
}

export interface RoutesLines {
	title: string;
	subtitle: string;
	downloadPdf: string;
	viewAll: string;
	cards: {
		barcelonaAirport: RouteLineCard;
		tarragonaBarcelona: RouteLineCard;
		costaDorada: RouteLineCard;
		reusSalou: RouteLineCard;
		estacioCamp: RouteLineCard;
		penedes: RouteLineCard;
	};
}

export interface RoutesBanner {
	title: string;
	body: string;
}

export interface Routes {
	title: string;
	hero: RoutesHero;
	search: RoutesSearch;
	results: RoutesResults;
	origins: RoutesOrigins;
	groups: RoutesGroups;
	lines: RoutesLines;
	banner: RoutesBanner;
}

export interface MobileAppHero {
	title: string;
}

export interface MobileAppSearch {
	fromPlaceholder: string;
	toPlaceholder: string;
	today: string;
	onePassenger: string;
	submit: string;
}

export interface MobileAppPopularCard {
	title: string;
	desc: string;
}

export interface MobileAppPopular {
	title: string;
	airport: {
		tag: string;
		title: string;
	};
	excursions: MobileAppPopularCard;
	timetables: MobileAppPopularCard;
}

export interface MobileAppNav {
	search: string;
	tickets: string;
	stops: string;
	profile: string;
}

export interface MobileApp {
	title: string;
	hero: MobileAppHero;
	search: MobileAppSearch;
	popular: MobileAppPopular;
	nav: MobileAppNav;
}

export interface LocationsHero {
	title: string;
	subtitle: string;
}

export interface LocationsCentral {
	title: string;
	tag: string;
	address1: string;
	address2: string;
	city: string;
}

export interface LocationBase {
	name: string;
	address: string;
	city: string;
}

export interface LocationsDelegations {
	title: string;
	label: string;
	bases: {
		tarragona: LocationBase;
		reus: LocationBase;
		garraf: LocationBase;
		calafell: LocationBase;
		barcelona: LocationBase;
		hospitalet: LocationBase;
	};
}

export interface Locations {
	title: string;
	hero: LocationsHero;
	mapBadge: string;
	central: LocationsCentral;
	delegations: LocationsDelegations;
	experience: {
		title: string;
		subtitle: string;
	};
}

export interface AboutJobs {
	title: string;
	desc: string;
	sendCvTitle: string;
	sendCvCta: string;
	applyOffer: string;
	viewOffers: string;
}

export interface AboutSocial {
	title: string;
	subtitle: string;
}

export interface About {
	title: string;
	heroTagline: string;
	heroTitle: string;
	qualityTitle: string;
	qualityIntro: string;
	qualityBody: string;
	qualityCommitment: string;
	qualityBullets: string[];
	qualityClosing: string;
	contactCtaTitle: string;
	contactCta: string;
	phoneHours: string;
	jobs: AboutJobs;
	social: AboutSocial;
	aboutUsTitle: string;
	aboutFooter: string;
	fundedBy: string;
}

export interface BookingTabs {
	booking: string;
	destination: string;
	passengers: string;
}

export interface HomeVariant1Booking {
	tabs: BookingTabs;
	origin: string;
	destination: string;
	date: string;
	passengers: string;
	originPlaceholder: string;
	destinationPlaceholder: string;
	datePlaceholder: string;
	passengersPlaceholder: string;
	search: string;
}

export interface RouteCard {
	name: string;
	desc: string;
}

export interface HomeVariant1Routes {
	title: string;
	startingFrom: string;
	price: string;
	cards: {
		barcelona: RouteCard;
		salou: RouteCard;
		tarragona: RouteCard;
	};
}

export interface HomeVariant1Footer {
	services: string;
	routesSchedules: string;
	privateServices: string;
	contact: string;
	social: string;
	legal: string;
}

export interface HomeVariant1 {
	title: string;
	booking: HomeVariant1Booking;
	routes: HomeVariant1Routes;
	footer: HomeVariant1Footer;
}

export interface LocationMobileBase {
	name: string;
	area: string;
}

export interface LocationsMobileDelegations {
	title: string;
	bases: {
		tarragona: LocationMobileBase;
		reus: LocationMobileBase;
		garraf: LocationMobileBase;
		calafell: LocationMobileBase;
		barcelona: LocationMobileBase;
		hospitalet: LocationMobileBase;
	};
}

export interface LocationsMobileNav {
	routes: string;
	tickets: string;
	locations: string;
	services: string;
}

export interface LocationsMobile {
	title: string;
	appbar: {
		title: string;
	};
	hero: {
		title: string;
	};
	central: {
		title: string;
		address: string;
	};
	delegations: LocationsMobileDelegations;
	nav: LocationsMobileNav;
}

export interface HomeVariant2Brand {
	name: string;
	suffix: string;
}

export interface HomeVariant2Nav {
	routesSchedules: string;
	privateServices: string;
	aboutUs: string;
	contact: string;
}

export interface HomeVariant2Booking {
	tabs: BookingTabs;
	origin: string;
	destination: string;
	date: string;
	passengers: string;
	originPlaceholder: string;
	destinationPlaceholder: string;
	datePlaceholder: string;
	oneAdult: string;
	twoAdults: string;
	search: string;
}

export interface HomeVariant2Routes {
	title: string;
	startingFrom: string;
	price: string;
	cards: {
		barcelona: RouteCard;
		salou: RouteCard;
		tarragona: RouteCard;
	};
}

export interface HomeVariant2Footer {
	services: string;
	contact: string;
	social: string;
	legal: string;
	email: string;
}

export interface HomeVariant2 {
	title: string;
	brand: HomeVariant2Brand;
	nav: HomeVariant2Nav;
	booking: HomeVariant2Booking;
	routes: HomeVariant2Routes;
	footer: HomeVariant2Footer;
}

export interface DiscretionaryIntro {
	title: string;
	subtitle: string;
	linkLabel: string;
}

export interface DiscretionaryHero {
	title: string;
	subtitle: string;
	cta: string;
}

export interface DiscretionaryProfessionals {
	title: string;
	subtitle: string;
	bullets: string[];
}

export interface DiscretionaryServiceCard {
	tag?: string;
	title: string;
	desc: string;
}

export interface DiscretionaryServices {
	title: string;
	subtitle: string;
	cards: {
		transfers: DiscretionaryServiceCard;
		weddings: DiscretionaryServiceCard;
		adapted: DiscretionaryServiceCard;
		mice: DiscretionaryServiceCard;
		companies: DiscretionaryServiceCard;
		school: DiscretionaryServiceCard;
		endOfYearTrips: DiscretionaryServiceCard;
		touristTrips: DiscretionaryServiceCard;
		internationalExcursions: DiscretionaryServiceCard;
	};
	moreInfo: string;
	viewDetails: string;
}

export interface DiscretionaryCta {
	title: string;
	contactTitle: string;
	subtitle: string;
	areaTarragona: string;
	areaBarcelona: string;
	phoneTarragona: string;
	phoneBarcelona: string;
	submit: string;
}

export interface Discretionary {
	title: string;
	intro: DiscretionaryIntro;
	hero: DiscretionaryHero;
	professionals: DiscretionaryProfessionals;
	services: DiscretionaryServices;
	cta: DiscretionaryCta;
}

export interface LegalNotice {
	title: string;
	heading: string;
	intro: string;
	address: string;
	sections: {
		userConcept: string;
		links: string;
		externalLinks: string;
		cookies: string;
		liability: string;
		technical: string;
		intellectualProperty: string;
		close: string;
	};
	sectionTitles: {
		userConcept: string;
		links: string;
		externalLinks: string;
		cookies: string;
		liability: string;
		technical: string;
		intellectualProperty: string;
	};
}

export interface CookiePolicy {
	title: string;
	heading: string;
	definitionTitle: string;
	definition: string;
	definitionBody: string;
	typesTitle: string;
	typesByTime: string;
	sessionCookies: string;
	persistentCookies: string;
	typesByPurpose: string;
	ownCookies: string;
	thirdPartyCookies: string;
	technicalCookies: string;
	analyticsCookies: string;
	advertisingCookies: string;
	configureTitle: string;
	configure: string;
	configureHelp: string;
	thirdPartyTitle: string;
	googleCookies: string;
	close: string;
}

export interface PrivacyPolicy {
	title: string;
	heading: string;
	sections: {
		object: string;
		responsible: string;
		collectedData: string;
		purpose: string;
		recipients: string;
		retention: string;
		rights: string;
		incidents: string;
		contact: string;
		userCommitment: string;
		userLiability: string;
		lssi: string;
		cookiesInfo: string;
		socialInfo: string;
	};
	sectionTitles: {
		object: string;
		responsible: string;
		collectedData: string;
		purpose: string;
		recipients: string;
		retention: string;
		rights: string;
		incidents: string;
		contact: string;
		userCommitment: string;
		userLiability: string;
		lssi: string;
		cookiesInfo: string;
		socialInfo: string;
	};
}

export interface CookieBanner {
	intro: string;
	accept: string;
	deny: string;
	settings: string;
	privacyTitle: string;
	privacyDesc: string;
	technicalTitle: string;
	technicalDesc: string;
	sessionCookie: string;
	xsrfCookie: string;
	analyticsTitle: string;
	analyticsDesc: string;
	googleAnalytics: string;
	lastReview: string;
	rejectAll: string;
	acceptAll: string;
	save: string;
}

export interface BusTrackingActions {
	passed: string;
	passedTitle: string;
	onTime: string;
	late: string;
	early: string;
	notPassed: string;
	cancelled: string;
}

export interface BusTrackingFeedback {
	thanks: string;
	thanksDesc: string;
	confirm: string;
	cancel: string;
	alreadyReported: string;
	selectIssue: string;
	minutesLate: string;
	comment: string;
	commentPlaceholder: string;
	send: string;
}

export interface BusTrackingAlerts {
	threshold: number;
	thresholdLabel: string;
	notifiedTitle: string;
	notifiedBody: string;
	coordinatorNotified: string;
	companyNotified: string;
	strikesLeft: string;
	resolved: string;
}

export interface BusTrackingStats {
	punctuality: string;
	reports: string;
	onTimeRate: string;
}

export interface BusTrackingStatus {
	pending: string;
	reported: string;
	reviewed: string;
	escalated: string;
}

export interface BusReview {
	title: string;
	subtitle: string;
	stars: string;
	driver: string;
	bus: string;
	punctuality: string;
	comfort: string;
	cleanliness: string;
	submit: string;
	thanks: string;
}

export interface BusTracking {
	title: string;
	subtitle: string;
	scheduled: string;
	stop: string;
	line: string;
	actions: BusTrackingActions;
	feedback: BusTrackingFeedback;
	alerts: BusTrackingAlerts;
	stats: BusTrackingStats;
	status: BusTrackingStatus;
	review: BusReview;
}

export interface Legal {
	legalNotice: LegalNotice;
	cookiePolicy: CookiePolicy;
	privacyPolicy: PrivacyPolicy;
	cookieBanner: CookieBanner;
}

export interface I18nDictionary {
	common: Common;
	home: Home;
	routes: Routes;
	mobileApp: MobileApp;
	locations: Locations;
	homeVariant1: HomeVariant1;
	locationsMobile: LocationsMobile;
	homeVariant2: HomeVariant2;
	discretionary: Discretionary;
	about: About;
	legal: Legal;
	busTracking: BusTracking;
}

export interface LocalizedPageProps {
	locale: Locale;
}

export interface DictionaryProps {
	dict: I18nDictionary;
}
