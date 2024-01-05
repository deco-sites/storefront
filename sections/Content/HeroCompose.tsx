import Container, {
  Props as ContainerProps,
} from "$store/components/ui/Container.tsx";
import BannerTextGeneric, {
  BannerTextGenericProps,
} from "$store/components/ui/BannerTextGeneric.tsx";

export interface Props {
  banner: BannerTextGenericProps;
  container?: ContainerProps;
}

export default function HeroCompose(props: Props) {
  return (
    <Container {...props.container}>
      <BannerTextGeneric {...props.banner} />
    </Container>
  );
}
