import { useEffect } from "react";

export default function useControlledInput(initial) {
  const [value, setValue] = useState(initial);

  return {
    value,
    onChange: (event) => setValue(event.target.value)
  };
};

/* 
function Application(props) {
  const firstname = useControlledInput("");
  const lastname = useControlledInput("");
  const email = useControlledInput("");
  const password = useControlledInput("");
  const passwordConfirmation = useControlledInput("");

  return (
    <form>
      <input {...firstname} />
      <input {...lastname} />
      <input {...email} />
      <input {...password} type="password" />
      <input {...passwordConfirmation} type="password" />
    </form>
  );
}
*/