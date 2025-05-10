import { redirect } from "next/navigation";

export default function Home() {
  redirect("/order/cafe")
  return (
    <h1>SIII!!??</h1>
  );
}
