import React, { useEffect, useState } from "react";
import { Avatar, Button, Navbar } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [client, setclient] = useState({ isConnected: false });
  const router = useRouter();

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      sethaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setclient({
          isConnected: true,
          address: accounts[0],
        });
      } else {
        setclient({
          isConnected: false,
        });
      }
    } else {
      sethaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setclient({
        isConnected: true,
        address: accounts[0],
      });
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);
  return (
    <div>
      <Navbar variant="static">
        <Navbar.Brand>
          <Avatar
            src="data:image/png;base64,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"
            css={{ size: "$12", mr: 10 }}
          />
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="highlight">
          <Link href="/">
            <Navbar.Link
              block
              isActive={router.pathname === "/" ? true : false}
            >
              Create
            </Navbar.Link>
          </Link>
          <Link href="/dashboard">
            <Navbar.Link
              block
              isActive={router.pathname === "/dashboard" ? true : false}
            >
              Dashboard
            </Navbar.Link>
          </Link>
        </Navbar.Content>
        <Navbar.Content>
          <Button
            onClick={connectWeb3}
            flat={client.isConnected ? true : false}
          >
            {client.isConnected ? (
              <>
                {client.address.slice(0, 6)}...
                {client.address.slice(36, 42)}
              </>
            ) : (
              <>Connect Wallet</>
            )}
          </Button>
        </Navbar.Content>
      </Navbar>
    </div>
  );
}

export default Header;
