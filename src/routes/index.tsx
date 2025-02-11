import { Routes as ReactRouter, Route as ReactRoute } from "react-router";
import { Home } from "../modules/home/page";

const Routes = () => {
  return (
    <ReactRouter>
      <ReactRoute path="/:renderId?" element={<Home />} />
      <ReactRoute path="/notexistingpage" element={<></>} />
    </ReactRouter>
  );
};

export { Routes };
