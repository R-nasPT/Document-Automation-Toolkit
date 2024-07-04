import { Page, Text, View, Document } from "@react-pdf/renderer";
import styles, { tw } from "../style";

export default function PDFTaxInvoice() {
  return (
    <Document>
      <Page size="A4" style={[tw("px-[30px] py-[20px]"), styles.sarabun]}>
        <View
          style={[tw("flex flex-row items-center gap-5"), styles.sarabunBold]}
        >
          <View style={tw("text-[24px] mb-[20px]")}>
            <Text>ใบกำกับภาษี</Text>
            <Text>Tax Invoice</Text>
          </View>
          <Text style={tw("text-[18px]")}>( ต้นฉบับ / original )</Text>
        </View>

        <View style={tw("text-[12px] flex flex-row justify-between")}>
          <View style={tw("flex flex-row gap-10")}>
            <View style={styles.sarabunBold}>
              <Text>ลูกค้า / Customer</Text>
              <Text>ที่อยู่ / Address</Text>
              <Text>เลขผู้เสียภาษี / Tax ID</Text>
              <Text>ผู้ติดต่อ / Attention</Text>
            </View>
            <View>
              <Text>น.ส.ปรีชญา วฒนกุล (สำนักงานใหญ่)</Text>
              <Text>559 ถ.ประจันตเขต ต.นางรอง อ.นางรอง จ.บุรีรัมย์ 31110</Text>
              <Text>1449900139372</Text>
              <Text>-</Text>
            </View>
          </View>
          <View style={tw("flex flex-row gap-10")}>
            <View style={styles.sarabunBold}>
              <Text>เลขที่ / No.</Text>
              <Text>วันที่ / Issue</Text>
              <Text>อ่างอิง / Ref.</Text>
            </View>
            <View>
              <Text>TIV-20191200001</Text>
              <Text>06/12/2019</Text>
              <Text>IV-201912013</Text>
            </View>
          </View>
        </View>

        <View style={tw("border-b border-black my-3")}></View>

        <View style={tw("text-[12px] flex flex-row justify-between")}>
          <View style={tw("flex flex-row gap-10")}>
            <View style={styles.sarabunBold}>
              <Text>ผู้ออก</Text>
              <Text>Issuer</Text>
            </View>
            <View>
              <Text>AT Production Company Limited (Head Office)</Text>
              <Text>อาคาร ไทยทาวเวอร์ ห้องที่ 145/161 ซอย27/7 ถนนคู้บอน</Text>
              <Text>แขวงท่าแร้ง เขตบางเขน กรุงเทพมหานคร 10220</Text>
            </View>
          </View>
          <View style={tw("flex flex-row gap-10")}>
            <View style={styles.sarabunBold}>
              <Text>เลขผู้เสียภาษี / Tax ID</Text>
              <Text>จัดเตรียมโดย / Prepared by</Text>
              <Text>T: 25</Text>
              <Text>W: https://peakengine.com</Text>
            </View>
            <View>
              <Text>0105557123422</Text>
              <Text>Support PEAK</Text>
              <Text>E: boonchai@peakengine.com</Text>
            </View>
          </View>
        </View>
        {/* ------------ Table -------------- */}
        <View
          style={tw(
            "flex flex-row justify-between text-[12px] border-y border-black mt-2"
          )}
        >
          <View style={tw("flex flex-col border-black py-1 pl-2 w-[40px]")}>
            <Text style={styles.sarabunBold}>รหัส</Text>
            <Text>ID no.</Text>
          </View>
          <View
            style={tw(
              "flex flex-col border-l border-black py-1 pl-2 w-[200px]"
            )}
          >
            <Text style={styles.sarabunBold}>คำอธิบาย</Text>
            <Text>Description</Text>
          </View>
          <View
            style={tw("flex flex-col border-l border-black py-1 pl-2 w-[40px]")}
          >
            <Text style={styles.sarabunBold}>จำนวน</Text>
            <Text>Quantity</Text>
          </View>
          <View
            style={tw("flex flex-col border-l border-black py-1 pl-2 w-[50px]")}
          >
            <Text style={styles.sarabunBold}>ราคาต่อหน่วย</Text>
            <Text>Unit Price</Text>
          </View>
          <View style={tw("flex flex-col border-l py-1 pl-2 w-[100px]")}>
            <Text style={styles.sarabunBold}>มูลค่าก่อนภาษี</Text>
            <Text>Pre-Tax Amount</Text>
          </View>
        </View>
        <View style={tw('"flex flex-row justify-between text-[12px] mt-2"')}>
          <Text style={tw("py-1 pl-2 w-[40px]")}>PS-147</Text>
          <Text style={tw("py-1 pl-2 border-l border-black w-[200px]")}>
            HAIFAI หูฟังครอบหู พร้อมไมโครโฟน MC-7900 สีดำ
          </Text>
          <Text style={tw("py-1 pl-2 border-l border-black w-[40px]")}>1</Text>
          <Text style={tw("py-1 pl-2 border-l border-black w-[50px]")}>
            950.00
          </Text>
          <Text style={tw("py-1 pl-2 border-l border-black w-[100px]")}>
            950.00
          </Text>
        </View>

        {Array(13)
          .fill(null)
          .map((_: any, index: number) => (
            <View
              key={index}
              style={tw('"flex flex-row justify-between text-[12px] mt-2"')}
            >
              <Text style={tw("py-1 pl-2 w-[40px]")}>&nbsp;</Text>
              <Text style={tw("py-1 pl-2 border-l border-black w-[200px]")}>
                &nbsp;
              </Text>
              <Text style={tw("py-1 pl-2 border-l border-black w-[40px]")}>
                &nbsp;
              </Text>
              <Text style={tw("py-1 pl-2 border-l border-black w-[50px]")}>
                &nbsp;
              </Text>
              <Text style={tw("py-1 pl-2 border-l border-black w-[100px]")}>
                &nbsp;
              </Text>
            </View>
          ))}
        {/* ------------ Table -------------- */}

        <View
          style={tw(
            "flex flex-row justify-between border-t border-black text-[12px]"
          )}
        >
          <View>
            <Text style={styles.sarabunBold}>หมายเหตุ / Remark</Text>
            <Text>bas</Text>
          </View>
          <View style={tw("w-[60%]")}>
            <View
              style={tw("flex flex-row border-b border-black justify-between")}
            >
              <Text style={[tw("py-1 pl-12"), styles.sarabunBold]}>
                ราคาสุทธิสินค้าที่เสียภาษี (บาท) / Pre-VAT Amount
              </Text>
              <Text style={tw("py-1 pl-2 border-l border-black w-[100px]")}>
                950.00
              </Text>
            </View>
            <View
              style={tw("flex flex-row border-b border-black justify-between")}
            >
              <Text style={[tw("py-1 pl-40"), styles.sarabunBold]}>
                ภาษีมูลค่าเพิ่ม (บาท) / VAT
              </Text>
              <Text style={tw("py-1 pl-2 border-l border-black w-[100px]")}>
                66.33
              </Text>
            </View>
            <View
              style={tw("flex flex-row border-b border-black justify-between")}
            >
              <Text style={[tw("py-1 pl-[68px]"), styles.sarabunBold]}>
                จำนวนเงินรวมทั้งสิ้น (บาท) / Grand Total
              </Text>
              <Text style={tw("py-1 pl-2 border-l border-black w-[100px]")}>
                1,016.50
              </Text>
            </View>
            <View
              style={tw(
                "flex flex-row items-center justify-between px-2 bg-[#f2f2f2]"
              )}
            >
              <Text style={[tw("py-1"), styles.sarabunBold]}>
                จำนวนเงินรวมทั้งสิ้น
              </Text>
              <Text>หนึ่งพันสิบหกบาทห้าสิบสตางต์</Text>
            </View>
          </View>
        </View>

        <View style={tw("border-b-2 border-black")}></View>

        <View style={tw("flex flex-row justify-between text-[12px] mt-3")}>
          <View></View>
          <View style={tw("flex flex-row gap-7")}>
            <View>
              <Text style={styles.sarabunBold}>อณุมัติโดย / Approved by</Text>
              <Text style={tw("h-[50px]")}></Text>
              <Text>
                ........................................................
              </Text>
              <Text>วันที่ / Date ...................................</Text>
            </View>
            <View>
              <Text style={styles.sarabunBold}>
                ผู้รับใบกำกับภาษี / Recipient
              </Text>
              <Text style={tw("h-[50px]")}></Text>
              <Text>
                ........................................................
              </Text>
              <Text>วันที่ / Date ...................................</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
