declare global {
  interface Window {
    numeric_widget: {
      funnel_id: number | null;
      product: any;
      shopUrl: string;
      environment: string;
      settings: any;
      signal: any;
      upload_ico_src: string;
      sharedOptions: string[];
      sharedOptionsEnabled: boolean;
    };
  }
}

export {};
