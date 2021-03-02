{
  inputs = {
    nixpkgs = {
      url = "nixpkgs-unstable";
    };

    yarn2nix = {
      url = "github:Profpatsch/yarn2nix";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, yarn2nix }:
    let
      supportedSystems = [ "x86_64-linux" "i686-linux" "aarch64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs supportedSystems (system: f system);
    in {
      overlay = system: final: prev:
        let
          pkgs = final;
          yarn2nixLib = (import "${yarn2nix}" {
            pkgs = final;
          }).nixLib;
        in
          {
            out = yarn2nixLib.buildNodePackage
              ( { src = yarn2nixLib.removePrefixes [ "node_modules" ] ./.; } //
                yarn2nixLib.callTemplate ./npm-package.nix
                  (yarn2nixLib.buildNodeDeps (pkgs.callPackage ./npm-deps.nix {})));
          };

      defaultPackage = forAllSystems (system: (import nixpkgs {
        inherit system;
        overlays = [ (self.overlay system) ];
      }).out);
  };
}
