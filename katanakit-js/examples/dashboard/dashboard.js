/**
 * Katana Admin — dashboard example.
 *
 * Every interactive piece comes from the library: the `@katanakit/ui`
 * component factories plus the toolkit services — DomService, ObserverService,
 * ThemeService and TimingService. No native `IntersectionObserver`,
 * `localStorage`, `setTimeout` or `querySelector` calls.
 *
 * Plain ESM with no bundler and no framework runtime: it imports the compiled
 * package directly (`bun run build` first).
 */
import { useDebounce, useSetTimeout } from "../../dist/core/services/timing.service.js";
import {
	useAppend,
	useCreateElement,
	useGetAttribute,
	useGetElementById,
	useOn,
	useQuerySelectorAll,
	useSetAttribute,
	useSetHtml,
	useSetText,
	useToggleClass,
} from "../../dist/infrastructure/dom/dom.service.js";
import {
	useObserverCreate,
	useObserverObserveAll,
} from "../../dist/infrastructure/observer/observer.service.js";
import {
	useGetResolved,
	useInitTheme,
	useToggleTheme,
} from "../../dist/infrastructure/theme/theme.service.js";
import {
	modal,
	toast,
	useAlert,
	useBadge,
	useButton,
	useCard,
	useInput,
	useSelect,
	useTabs,
} from "../../packages/ui/dist/index.js";

/* -------------------------------------------------------------------------- */
/* DOM helpers — DomService, not raw DOM                                      */
/* -------------------------------------------------------------------------- */

const byId = (id) => useGetElementById(id);

const el = (tag, className, text) => {
	const node = useCreateElement(tag);
	if (className) useSetAttribute(node, "class", className);
	if (text !== undefined) useSetText(node, text);
	return node;
};

const appendAll = (parent, ...nodes) => {
	for (const node of nodes) useAppend(parent, node);
};

const mount = (id, ...nodes) => {
	const host = byId(id);
	if (!host) throw new Error(`[dashboard] missing mount point #${id}`);
	useSetHtml(host, "");
	appendAll(host, ...nodes);
};

const panel = (className, ...nodes) => {
	const node = el("div", className);
	appendAll(node, ...nodes);
	return node;
};

const row = (...nodes) => panel("row", ...nodes);

const on = (id, event, handler) => useOn(byId(id), event, handler);

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

const stats = [
	{ label: "Revenue", value: "$48,290", delta: "+12.4%", variant: "success" },
	{ label: "Orders", value: "1,284", delta: "+3.1%", variant: "info" },
	{ label: "Customers", value: "8,731", delta: "+0.8%", variant: "warning" },
	{ label: "Refunds", value: "$1,120", delta: "-2.4%", variant: "danger" },
];

mount(
	"stats",
	...stats.map((stat) =>
		useCard({
			elevated: true,
			children: [
				el("p", "stat-label", stat.label),
				el("p", "stat-value", stat.value),
				useBadge({ label: stat.delta, variant: stat.variant }),
			],
		}),
	),
);

mount(
	"overview-alert",
	useAlert({
		variant: "info",
		title: "Demo data",
		message:
			"Figures are mocked. Only components, tokens and services come from katanakit-js.",
		dismissible: true,
		onDismiss: () => toast.success("Alert dismissed."),
	}),
);

const revenuePanel = () => {
	const heights = [42, 58, 36, 64, 52, 71, 48, 66, 57, 78, 62, 84];
	const bars = el("div", "bars");
	for (const height of heights) {
		const bar = el("div", "bar");
		useSetAttribute(bar, "style", `height:${height}%`);
		useAppend(bars, bar);
	}

	const labels = el("div", "bar-labels");
	for (const month of ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]) {
		useAppend(labels, el("span", null, month));
	}

	return panel(
		"stack",
		el("p", "text-sm text-neutral-500", "Indexed to the best month of the year."),
		bars,
		labels,
	);
};

const customersPanel = () => {
	const customers = [
		["Ada Lovelace", "$12,480"],
		["Grace Hopper", "$9,150"],
		["Alan Turing", "$7,320"],
		["Margaret Hamilton", "$6,010"],
	];

	const list = el("div", "stack");
	for (const [name, total] of customers) {
		useAppend(
			list,
			panel(
				"row row--between",
				el("span", null, name),
				el("span", "text-sm text-neutral-500", total),
			),
		);
	}
	return list;
};

const activityPanel = () => {
	const events = [
		["2026-10-24", "Order ORD-1042 paid by Ada Lovelace."],
		["2026-10-24", "Refund issued for ORD-1031."],
		["2026-10-23", "New customer registered: Grace Hopper."],
		["2026-10-23", "Weekly revenue report emailed."],
	];

	const list = el("div", "stack");
	for (const [date, text] of events) {
		useAppend(
			list,
			panel(
				"row row--between",
				el("span", null, text),
				el("span", "text-sm text-neutral-500", date),
			),
		);
	}
	return list;
};

const overviewTabs = useTabs({
	label: "Overview panels",
	tabs: [
		{ id: "revenue", label: "Revenue", content: revenuePanel() },
		{ id: "customers", label: "Customers", content: customersPanel() },
		{ id: "activity", label: "Activity", content: activityPanel() },
	],
});
mount("overview-tabs", overviewTabs.root);

/* -------------------------------------------------------------------------- */
/* Buttons / badges / alerts                                                 */
/* -------------------------------------------------------------------------- */

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

mount(
	"buttons-variants",
	...["primary", "secondary", "ghost", "danger"].map((variant) =>
		useButton({
			label: capitalize(variant),
			variant,
			onClick: () => toast.info(`${capitalize(variant)} button clicked.`),
		}),
	),
);

mount(
	"buttons-sizes",
	...[
		["sm", "Small"],
		["md", "Medium"],
		["lg", "Large"],
	].map(([size, label]) => useButton({ label, size, variant: "secondary" })),
);

mount(
	"buttons-states",
	useButton({ label: "Saving…", loading: true }),
	useButton({ label: "Disabled", disabled: true }),
);

mount(
	"badges-demo",
	...["neutral", "info", "success", "warning", "danger"].map((variant) =>
		useBadge({ label: capitalize(variant), variant }),
	),
);

mount(
	"alerts-demo",
	useAlert({
		variant: "info",
		title: "Scheduled maintenance",
		message: "The API stays read-only on Sunday from 02:00 to 04:00 UTC.",
	}),
	useAlert({
		variant: "success",
		title: "Export ready",
		message: "The October report is available for download.",
	}),
	useAlert({
		variant: "warning",
		title: "Rate limit at 80%",
		message: "You have used 8,000 of the 10,000 monthly requests.",
	}),
	useAlert({
		variant: "danger",
		title: "Payment failed",
		message: "Update the card on file to avoid suspension.",
		dismissible: true,
		onDismiss: () => toast.success("Alert dismissed."),
	}),
);

/* -------------------------------------------------------------------------- */
/* Forms                                                                      */
/* -------------------------------------------------------------------------- */

const customerInput = useInput({
	label: "Customer name",
	name: "customer",
	placeholder: "Ada Lovelace",
	required: true,
	help: "Shown on the invoice.",
});

const emailInput = useInput({
	label: "Email",
	name: "email",
	type: "email",
	placeholder: "ada@example.com",
});

const promoInput = useInput({
	label: "Promo code",
	name: "promo",
	value: "SPRING24",
	error: "This code expired on 2026-06-01.",
});

const accountInput = useInput({
	label: "Account",
	name: "account",
	value: "acct_1024",
	disabled: true,
});

const statusSelect = useSelect({
	label: "Status",
	name: "status",
	options: [
		{ value: "open", label: "Open" },
		{ value: "paid", label: "Paid" },
		{ value: "refunded", label: "Refunded" },
		{ value: "failed", label: "Failed" },
	],
	value: "open",
	onChange: (value) => toast.info(`Status set to ${value}.`),
});

mount(
	"form-fields",
	customerInput.root,
	emailInput.root,
	promoInput.root,
	accountInput.root,
	statusSelect.root,
);

on("order-form", "submit", (event) => {
	event.preventDefault();
	const name = customerInput.input.value.trim();
	if (!name) {
		customerInput.input.focus();
		toast.error("Customer name is required.");
		return;
	}
	toast.success(`Order created for ${name}.`);
});

/* -------------------------------------------------------------------------- */
/* Tabs                                                                       */
/* -------------------------------------------------------------------------- */

const tabs = useTabs({
	label: "Account settings",
	tabs: [
		{
			id: "profile",
			label: "Profile",
			content: panel(
				"stack",
				el("p", null, "Ada Lovelace · ada@example.com"),
				el("p", "text-sm text-neutral-500", "Tabs use roving tabindex: Tab enters once, arrows move."),
			),
		},
		{
			id: "billing",
			label: "Billing",
			content: panel(
				"stack",
				el("p", null, "Scale plan · $79 billed annually"),
				el("p", "text-sm text-neutral-500", "Panels are keyboard reachable even when empty."),
			),
		},
		{
			id: "notifications",
			label: "Notifications",
			content: "Enable order and refund emails.",
		},
		{ id: "danger", label: "Danger zone", disabled: true },
	],
});
mount("tabs-demo", tabs.root);

/* -------------------------------------------------------------------------- */
/* Cards                                                                      */
/* -------------------------------------------------------------------------- */

mount(
	"cards-demo",
	useCard({
		title: "Starter",
		children: [
			el("p", "stat-value", "$19"),
			el("p", "text-sm text-neutral-500", "1 project · community support · 10k requests."),
		],
		footer: "Billed monthly",
	}),
	useCard({
		title: "Scale",
		elevated: true,
		children: [
			el("p", "stat-value", "$79"),
			el("p", "text-sm text-neutral-500", "10 projects · priority support · 1M requests."),
		],
		footer: "Most popular · billed annually",
	}),
);

/* -------------------------------------------------------------------------- */
/* Modal                                                                      */
/* -------------------------------------------------------------------------- */

const confirmFooter = (label, onConfirm) => {
	const footer = el("div", "row");
	appendAll(
		footer,
		useButton({ label: "Cancel", variant: "ghost", onClick: () => modal.close() }),
		useButton({
			label,
			variant: "danger",
			onClick: () => {
				modal.close();
				onConfirm();
			},
		}),
	);
	return footer;
};

const openFormDialog = () => {
	const name = useInput({ label: "Workspace name", name: "workspace-name", value: "Katana" });
	const content = el("div", "form-grid");
	useAppend(content, name.root);

	const footer = el("div", "row");
	appendAll(
		footer,
		useButton({ label: "Cancel", variant: "ghost", onClick: () => modal.close() }),
		useButton({
			label: "Rename",
			onClick: () => {
				modal.close();
				toast.success(`Workspace renamed to ${name.input.value.trim() || "Katana"}.`);
			},
		}),
	);

	modal.open({ title: "Rename workspace", content, footer });
};

mount(
	"modal-demo",
	useButton({
		label: "Open dialog",
		variant: "primary",
		onClick: () =>
			modal.open({
				title: "Delete project?",
				message: "This cannot be undone.",
				footer: confirmFooter("Delete", () => toast.success("Project deleted (demo).")),
			}),
	}),
	useButton({
		label: "Open small dialog",
		variant: "secondary",
		size: "sm",
		onClick: () =>
			modal.open({
				title: "Nothing to see",
				message: "A small dialog with no footer.",
				size: "sm",
			}),
	}),
	useButton({
		label: "Open form dialog",
		variant: "secondary",
		onClick: openFormDialog,
	}),
);

/* -------------------------------------------------------------------------- */
/* Toasts                                                                     */
/* -------------------------------------------------------------------------- */

mount(
	"toasts-demo",
	...[
		["info", "Info"],
		["success", "Success"],
		["warning", "Warning"],
		["error", "Error"],
	].map(([type, label]) =>
		useButton({
			label,
			variant: "secondary",
			onClick: () => toast[type](`${label} toast queued from the example.`),
		}),
	),
	useButton({
		label: "Loading → success",
		variant: "primary",
		onClick: () => {
			const handle = toast.loading("Syncing orders…");
			useSetTimeout(() => {
				handle.update({
					type: "success",
					title: "Sync complete",
					message: "128 orders refreshed.",
				});
			}, 1400);
		},
	}),
);

/* -------------------------------------------------------------------------- */
/* Orders table                                                               */
/* -------------------------------------------------------------------------- */

const orders = [
	{ id: "ORD-1042", customer: "Ada Lovelace", date: "2026-10-24", total: "$129.00", status: "paid" },
	{ id: "ORD-1041", customer: "Grace Hopper", date: "2026-10-24", total: "$74.50", status: "pending" },
	{ id: "ORD-1040", customer: "Alan Turing", date: "2026-10-23", total: "$240.00", status: "paid" },
	{ id: "ORD-1039", customer: "Margaret Hamilton", date: "2026-10-23", total: "$58.20", status: "refunded" },
	{ id: "ORD-1038", customer: "Katherine Johnson", date: "2026-10-22", total: "$312.00", status: "failed" },
	{ id: "ORD-1037", customer: "Linus Torvalds", date: "2026-10-22", total: "$96.00", status: "paid" },
	{ id: "ORD-1036", customer: "Barbara Liskov", date: "2026-10-21", total: "$44.90", status: "pending" },
];

const statusMeta = {
	paid: ["success", "Paid"],
	pending: ["warning", "Pending"],
	refunded: ["info", "Refunded"],
	failed: ["danger", "Failed"],
};

const ordersCount = byId("orders-count");
const ordersBody = byId("orders-body");

const renderOrders = (query = "") => {
	const needle = query.trim().toLowerCase();
	const visible = orders.filter(
		(order) =>
			!needle ||
			order.id.toLowerCase().includes(needle) ||
			order.customer.toLowerCase().includes(needle),
	);

	useSetHtml(ordersBody, "");

	if (visible.length === 0) {
		const emptyRow = el("tr");
		const cell = el("td", "cell-empty", `No orders match “${query.trim()}”.`);
		useSetAttribute(cell, "colspan", "6");
		useAppend(emptyRow, cell);
		useAppend(ordersBody, emptyRow);
	} else {
		for (const order of visible) {
			const [variant, label] = statusMeta[order.status];
			const rowEl = el("tr");

			useAppend(rowEl, el("td", "font-medium", order.id));
			useAppend(rowEl, el("td", null, order.customer));
			useAppend(rowEl, el("td", "text-neutral-500", order.date));
			useAppend(rowEl, el("td", "text-right", order.total));

			const statusCell = el("td");
			useAppend(statusCell, useBadge({ label, variant }));
			useAppend(rowEl, statusCell);

			const actionCell = el("td", "text-right");
			useAppend(
				actionCell,
				useButton({
					label: "View",
					size: "sm",
					variant: "ghost",
					onClick: () =>
						modal.open({
							title: `Order ${order.id}`,
							message: `${order.customer} · ${order.date} · ${order.total}`,
							size: "sm",
						}),
				}),
			);
			useAppend(rowEl, actionCell);

			useAppend(ordersBody, rowEl);
		}
	}

	useSetText(ordersCount, `${visible.length} order${visible.length === 1 ? "" : "s"}`);
};

const filterOrders = useDebounce((value) => renderOrders(String(value)), 120);

const ordersSearch = useInput({
	type: "search",
	placeholder: "Filter by order or customer…",
	onInput: (value) => filterOrders(value),
});
useSetAttribute(ordersSearch.input, "aria-label", "Filter orders");
mount("orders-search", ordersSearch.root);
renderOrders();

/* -------------------------------------------------------------------------- */
/* Settings: theme (ThemeService), toasts, danger zone                        */
/* -------------------------------------------------------------------------- */

const themeButtons = [byId("theme-toggle"), byId("theme-toggle-2")];

useInitTheme({
	storageKey: "katana-example-theme",
	defaultMode: "light",
	onChange: (_mode, resolved) => {
		for (const button of themeButtons) {
			useSetText(button, resolved === "dark" ? "Light mode" : "Dark mode");
			useSetAttribute(button, "aria-pressed", String(resolved === "dark"));
		}
	},
});

const toggleTheme = () => {
	useToggleTheme();
	toast.info(
		`${useGetResolved() === "dark" ? "Dark" : "Light"} mode on — same tokens, inverted palette.`,
	);
};

for (const button of themeButtons) useOn(button, "click", toggleTheme);

on("clear-toasts", "click", () => {
	toast.clear();
	toast.info("Toast stack cleared.");
});

on("danger-action", "click", () => {
	modal.open({
		title: "Delete workspace?",
		message: "Every project, order and API key is removed. This cannot be undone.",
		size: "sm",
		footer: confirmFooter("Delete workspace", () =>
			toast.success("Workspace deleted — demo only, nothing was removed."),
		),
	});
});

on("new-order", "click", () => {
	const name = useInput({
		label: "Customer name",
		name: "new-customer",
		placeholder: "Ada Lovelace",
		required: true,
	});
	const email = useInput({
		label: "Email",
		name: "new-email",
		type: "email",
		placeholder: "ada@example.com",
	});
	const amount = useInput({ label: "Amount (USD)", name: "new-amount", value: "0.00" });

	const content = el("div", "form-grid");
	appendAll(content, name.root, email.root, amount.root);

	const footer = el("div", "row");
	appendAll(
		footer,
		useButton({ label: "Cancel", variant: "ghost", onClick: () => modal.close() }),
		useButton({
			label: "Create order",
			onClick: () => {
				const customer = name.input.value.trim();
				if (!customer) {
					name.input.focus();
					toast.error("Customer name is required.");
					return;
				}
				modal.close();
				toast.success(`Order created for ${customer}.`);
			},
		}),
	);

	modal.open({ title: "New order", content, footer });
});

/* -------------------------------------------------------------------------- */
/* Scrollspy — ObserverService, not a raw IntersectionObserver                */
/* -------------------------------------------------------------------------- */

const navLinks = useQuerySelectorAll(".nav__link");
const linkBySection = new Map(
	navLinks.map((link) => [useGetAttribute(link, "href").slice(1), link]),
);

const setActive = (id) => {
	for (const link of navLinks) {
		useToggleClass(link, "is-active", link === linkBySection.get(id));
	}
};

setActive("overview");

// `autoUnobserve = false`: the scrollspy needs every intersection, not the first.
useObserverCreate(
	"dashboard-scrollspy",
	(entry) => setActive(entry.target.id),
	{ rootMargin: "-30% 0px -60% 0px", threshold: 0 },
	false,
);
useObserverObserveAll("dashboard-scrollspy", "main .section");
