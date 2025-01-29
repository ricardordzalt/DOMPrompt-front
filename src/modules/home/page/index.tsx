import { UIHome } from "./ui/ui-home";
import { useHome } from "./hooks/use-home";

const Home = () => {
  const props = useHome();

  return <UIHome {...props} />;
};

export { Home };
