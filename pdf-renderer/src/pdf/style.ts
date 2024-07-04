import { StyleSheet, Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

Font.register({
  family: "THSarabunNew",
  src: "/fonts/THSarabunNew.ttf",
});

Font.register({
  family: "THSarabunNew-bold",
  src: "/fonts/THSarabunNew Bold.ttf",
});

const styles = StyleSheet.create({
  sarabun: {
    fontFamily: 'THSarabunNew'
  },
  sarabunBold: {
    fontFamily: 'THSarabunNew-bold'
  },
});

export const tw = createTw({
  theme: {
    extend: {},
  },
});

export default styles;
