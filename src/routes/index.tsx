import { Routes as ReactRouter, Route as ReactRoute } from "react-router";
import { Home } from "../modules/home/page";
import { PolicyPrivacy } from "../modules/privacy-policy/page";

const Routes = () => {
  return (
    <ReactRouter>
      <ReactRoute path="/:renderId?" element={<Home />} />
      <ReactRoute path="/not-existing-page" element={<></>} />
      <ReactRoute path="/policy-privacy" element={<PolicyPrivacy />} />
    </ReactRouter>
  );
};

export { Routes };
