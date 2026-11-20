/** Detects weak / old devices so heavy visual effects can be dialed down. */
export function detectLite(): boolean {
  try {
    const n = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const lowMem = typeof n.deviceMemory === 'number' && n.deviceMemory <= 4;
    const lowCpu = typeof n.hardwareConcurrency === 'number' && n.hardwareConcurrency <= 4;
    const saveData = !!n.connection?.saveData || /(^|-)2g$/.test(n.connection?.effectiveType || '');
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const oldBrowser =
      typeof CSS === 'undefined' ||
      !CSS.supports ||
      !CSS.supports('color', 'color-mix(in srgb, red, blue)') ||
      !CSS.supports('translate', '1px');
    const params = new URLSearchParams(location.search);
    if (params.get('lite') === '0') return false;
    if (params.get('lite') === '1') return true;
    return oldBrowser || saveData || lowMem || (coarse && lowCpu);
  } catch {
    return true;
  }
}
