export interface Props {
  steps: Step[];
  vertical?: boolean;
  responsive?: boolean;
}

interface Step {
  done?: boolean;
  label: string;
}

export default function Steps(props: Props) {
  const { steps, vertical, responsive } = props;

  return (
    <ul
      className={`steps ${
        vertical && responsive
          ? "steps-vertical lg:steps-horizontal"
          : vertical && !responsive
          ? "steps-vertical"
          : ""
      }`}
    >
      {steps.map((step) => {
        return (
          <li className={`step ${step.done ? "step-primary" : ""}`}>
            {step.label}
          </li>
        );
      })}
    </ul>
  );
}
