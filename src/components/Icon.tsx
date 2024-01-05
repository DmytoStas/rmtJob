type IconProps = { id: string } & React.SVGProps<SVGSVGElement>;

export default function Icon({ id, ...rest }: IconProps) {
  return (
    <svg {...rest}>
      <use xlinkHref={`#${id}`} />
    </svg>
  );
}
