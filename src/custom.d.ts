declare module "*.svg" {
  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  const content: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  export default content;
}

type Share = {
  id: string;
  name: string;
  ticker: string;
  industry: string;
  numberOfYears: number;
  price: number;
  dividendYield: number;
};

type AppState = {
  ui: {
    loading: boolean;
    error: string;
  };
  data: {
    champions: Share[];
    shares: Share[];
  };
};

type LoadingAction = {
  type: "LOADING";
};

type ErrorAction = {
  type: "ERROR";
  payload: { error: string };
};

type SharesAction = {
  type: "FETCH_SHARES" | "SORT_SHARES";
  payload: { champions?: Share[]; shares: Share[] };
};

type Action = LoadingAction | ErrorAction | SharesAction;
