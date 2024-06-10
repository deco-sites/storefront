import { useScript } from "apps/utils/useScript.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

const onLoad = (containerID: string) => {
  window.STOREFRONT.USER.subscribe((sdk) => {
    const container = document.getElementById(containerID) as HTMLDivElement;

    const nodes = container.querySelectorAll<HTMLAnchorElement>("a");

    const login = nodes.item(0);
    const account = nodes.item(1);

    const user = sdk.getUser();

    if (user?.email) {
      login.classList.add("hidden");
      account.classList.remove("hidden");
    } else {
      login.classList.remove("hidden");
      account.classList.add("hidden");
    }
  });
};

function Login() {
  const id = useId();

  return (
    <div id={id}>
      <a
        class="btn btn-sm btn-ghost font-thin no-animation"
        href="/login"
        aria-label="Login"
      >
        <Icon id="User" size={20} strokeWidth={0.4} />
        <span>LOGIN</span>
      </a>
      <a
        class="btn btn-sm btn-ghost font-thin no-animation hidden"
        href="/account"
        aria-label="Account"
      >
        <Icon id="User" size={20} strokeWidth={0.4} />
        <span>ACCOUNT</span>
      </a>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}

export default Login;
