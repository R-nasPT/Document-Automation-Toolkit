import { ForwardedRef, forwardRef } from "react";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";

const PrintLabel = forwardRef<HTMLDivElement, {}>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <section style={{ padding: "10px", width: "380px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>KERRY</h1>
            <h1
              style={{
                border: "3px solid black",
                padding: "0 9px",
                lineHeight: 1,
              }}
            >
              ND
            </h1>
          </div>
          <hr style={{ border: "1px solid black", margin: "1px 0" }} />
          <Barcode
            value="KEX 100 020 002 178"
            width={1.44}
            height={55}
            margin={4}
            fontSize={16}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: 800,
              borderTop: "2px solid black",
              fontSize: "25px",
            }}
          >
            <h1
              style={{ borderRight: "2px solid black", paddingRight: "15px" }}
            >
              C
            </h1>
            <h1
              style={{ borderRight: "2px solid black", paddingRight: "15px" }}
            >
              BRP
            </h1>
            <h1
              style={{ borderRight: "2px solid black", paddingRight: "15px" }}
            >
              BRP999
            </h1>
            <h1 style={{ fontSize: "20px" }}>21 of 25</h1>
          </div>
          <div style={{ border: "2px solid black" }}>
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: "12px", padding: "10px 5px 10px 1px" }}>
                <p>ผู้รับ: test</p>
                <p>โทร: 0*4777</p>
                <p>
                  ที่อยู่: 39/289 ม.10 หมู่บ้าน สิริการต์ บางบัวทอง
                  อำเภอบางบัวทอง นนทบุรี 11110
                </p>
                <p style={{ textAlign: "right" }}>CW: 20KG</p>
              </div>
              <div style={{ borderLeft: "2px solid black", padding: "13px" }}>
                <QRCode value="https://www.google.co.th" size={120} />
              </div>
            </div>
            <div style={{ display: "flex", borderTop: "2px solid black" }}>
              <h1
                style={{
                  borderRight: "2px solid black",
                  paddingRight: "130px",
                  fontWeight: 800,
                  fontSize: "25px",
                }}
              >
                B11*KP-P04
              </h1>
              <div></div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderTop: "2px solid black",
                fontSize: '12px',
                justifyContent:'space-between',
                height: '150px'
              }}
            >
              <p>หมายเหตุ: Pkg:XL, Wt: 20.00 kg.</p>
              <p>[BRK3] itbouat POS01 Checked 2023-10-03 11:48</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
);

PrintLabel.displayName = "PrintLabel";

export default PrintLabel;
