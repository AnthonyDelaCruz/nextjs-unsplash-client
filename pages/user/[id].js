import Layout from "../../components/MainLayout";
import ComingSoon from "../../components/ComingSoon";

export default function UserProfile() {
  return (
    <Layout withOutSidebarComingSoon withOutSidebar>
      <ComingSoon type="page" />
    </Layout>
  );
}
