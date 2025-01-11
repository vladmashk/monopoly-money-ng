export function formatAmount(amount: number): string {
    return new Intl.NumberFormat("fr-FR").format(amount);
}

const rtf = new Intl.RelativeTimeFormat("en", {style: "short"});

export function relativeTime(timestamp: number) {
    const diff = timestamp - Date.now();
    if (Math.abs(diff) < 60000) {
        return rtf.format(Math.ceil(diff / 1000), "seconds");
    }
    if (Math.abs(diff) < 3600000) {
        return rtf.format(Math.ceil(diff / 60000), "minutes");
    }
    if (Math.abs(diff) < 24 * 3600000) {
        return rtf.format(Math.ceil(diff / 3600000), "hours");
    }
    return rtf.format(Math.ceil(diff / 86400000), "days");
}
