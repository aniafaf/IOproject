import { LoggedInGuard } from "../../components/LoggedInGuard";

export const HomeView = () => (
  <>
    <LoggedInGuard />
    <h1>[PH] home</h1>
  </>
)