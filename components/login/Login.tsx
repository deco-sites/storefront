import Button from "$store/components/ui/Button.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  placeholderName: string;
  placeholderPassword: string;
  textButton: string;
}

function Login({
  placeholderName, 
  placeholderPassword,
  textButton
}: Props) {
    const id = useId();
    const action = "/s";
  return (
    <>
     <form id={id} action={action} class="join">
        <input name="Key" placeholder={placeholderName}></input>
        <input name="Password" placeholder={placeholderPassword}></input>
        <button>{textButton}</button>
        <Button
          type="submit"
          aria-label="Login"
          for={id}
          tabIndex={-1}
        >
          {textButton}
        </Button>
     </form>
    </>
  );
}

export default Login;
