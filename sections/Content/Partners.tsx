import Container, { Props as ContainerProps } from "$store/sections/Layout/Container.tsx";
import Partners, {
  Props as PartnerProps,
} from "$store/components/ui/Partners.tsx";

export interface Props {
  partners: PartnerProps;
  container?: ContainerProps;
}

export default function HeroCompose(props: Props) {
  return (
    <Container {...props.container}>
      <Partners {...props.partners} />
    </Container>
  );
}
