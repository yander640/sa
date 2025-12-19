export interface MaskOption {
  prefix: number;
  mask: string;
  label: string;
}

function prefixToSubnetMask(prefix: number): string {
  if (prefix < 0 || prefix > 32) return '0.0.0.0';
  const binary = '1'.repeat(prefix).padEnd(32, '0');
  const octets = [];
  for (let i = 0; i < 4; i++) {
    const chunk = binary.slice(i * 8, (i + 1) * 8);
    octets.push(parseInt(chunk, 2));
  }
  return octets.join('.');
}

export const maskOptions: MaskOption[] = [];
for (let i = 0; i <= 32; i++) {
  const mask = prefixToSubnetMask(i);
  maskOptions.push({
    prefix: i,
    mask,
    label: `${i}/${mask}`,
  });
}
