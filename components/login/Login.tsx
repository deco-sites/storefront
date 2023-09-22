import { itemToAnalyticsItem } from "apps/linx/hooks/useLogin.ts";
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
    const key = useId();
    const password = useId();
    const action = "/s";
    const objLogin = {
      login: {
        key,
        password
      }
    }
  return (
    <>
     <form id={id} action={action} class="join">
        <input name="Key" id={key} placeholder={placeholderName}></input>
        <input name="Password" id={password} placeholder={placeholderPassword}></input>
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
