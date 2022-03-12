import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages/landing";
import { Gallery } from "./pages/gallery";
import { Punk } from "./pages/punk";

export const HomeRouter: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path={`/`} element={<Landing />} />
      <Route path={`/punks`} element={<Gallery />} />
      <Route path={`/punk/:tokenId`} element={<Punk />} />
    </Routes>
  );
};
