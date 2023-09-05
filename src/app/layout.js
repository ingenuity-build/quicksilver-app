import Header from "@/components/header";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "@/components/footer";
import CreateCosmosApp from "../provider/chainProvider";
import { Providers } from "@/slices/Provider";

export const metadata = {
  title: "Quick Silver",
  description:
    "The Quicksilver Protocol is redefining staking in the Cosmos ecosystem and beyond",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CreateCosmosApp>
            <Header />
            <div className="main-layout">{children}</div>
            <Footer />
          </CreateCosmosApp>
        </Providers>
      </body>
    </html>
  );
}
