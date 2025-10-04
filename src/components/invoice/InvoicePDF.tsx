import type { Invoice } from "@/types/InvoiceType";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import { formatDate } from "@/utils/formatDate";
import { generateInvoiceId } from "@/utils/formatText";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  container: {
    maxWidth: 600,
    margin: "0 auto",
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 8,
    objectFit: "cover",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: 2,
    borderBottomColor: "#d1d5db",
  },
  title: {
    fontSize: 15,
    fontWeight: "semibold",
    marginBottom: 8,
  },
  invoiceId: {
    fontSize: 12,
    color: "#4b5563",
  },
  dateContainer: {
    textAlign: "right",
  },
  dateLabel: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 11,
    fontWeight: "semibold",
  },
  table: {
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007b9e",
    color: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableCell: {
    fontSize: 10,
  },
  col1: { width: "8%" },
  col2: { width: "25%" },
  col3: { width: "12%" },
  col4: { width: "10%" },
  col5: { width: "15%" },
  col6: { width: "15%" },
  col7: { width: "15%" },
  textRight: {
    textAlign: "right",
  },
  totalsContainer: {
    width: 256,
    marginLeft: "auto",
    marginBottom: 24,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
  },

  totalLastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottom: "none",
  },

  totalLabel: {
    fontSize: 10,
    color: "#4b5563",
  },
  totalValue: {
    fontSize: 10,
    fontWeight: "semibold",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTop: 2,
    borderTopColor: "#d1d5db",
    marginTop: 8,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
  },
  footerText: {
    fontSize: 10,
  },
});

export type InvoiceProps = {
  data?: Invoice;
};

const InvoicePDF = ({ data }: InvoiceProps) => {
  const allItems = [
    ...(data?.invoiceItems || []).map((item) => ({
      ...item,
      itemType: "product" as const,
    })),
    ...(data?.invoiceServices || []).map((service) => ({
      ...service,
      itemType: "service" as const,
    })),
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Logo */}
          <Image src="/images/YnoLogo.JPG" style={styles.logo} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Yaung Ni Oo</Text>
              <Text style={styles.invoiceId}>
                #
                {data?.id && data?.location?.name
                  ? generateInvoiceId(data.id, data.location.name)
                  : "N/A"}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Invoice Date</Text>
              <Text style={styles.dateValue}>
                {data?.createdAt ? formatDate(new Date(data.createdAt)) : "N/A"}
              </Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.col1]}>No</Text>
              <Text style={[styles.tableCell, styles.col2]}>Name</Text>
              <Text style={[styles.tableCell, styles.col3, styles.textRight]}>
                Qty
              </Text>
              <Text style={[styles.tableCell, styles.col4, styles.textRight]}>
                Unit
              </Text>
              <Text style={[styles.tableCell, styles.col5, styles.textRight]}>
                Unit Price
              </Text>
              <Text style={[styles.tableCell, styles.col6, styles.textRight]}>
                Discount Price
              </Text>
              <Text style={[styles.tableCell, styles.col7, styles.textRight]}>
                Amount
              </Text>
            </View>

            {allItems.map((item, index) => {
              const isProduct = item.itemType === "product";
              const name = isProduct ? item.itemName : `${item.name} (Service)`;
              const price = item.retailPrice ?? 0;
              const discount = isProduct ? item.discountPrice ?? 0 : 0;
              const total = price - discount;

              return (
                <View
                  key={`${item.itemType}-${item.id}`}
                  style={styles.tableRow}
                >
                  <Text style={[styles.tableCell, styles.col1]}>
                    {index + 1}
                  </Text>
                  <Text style={[styles.tableCell, styles.col2]}>
                    {name ?? "-"}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.col3, styles.textRight]}
                  >
                    {isProduct ? item.quantity ?? "-" : "-"}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.col4, styles.textRight]}
                  >
                    {isProduct ? item.unitType ?? "-" : "-"}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.col5, styles.textRight]}
                  >
                    {price}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.col6, styles.textRight]}
                  >
                    {discount}
                  </Text>
                  <Text
                    style={[styles.tableCell, styles.col7, styles.textRight]}
                  >
                    {total}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.totalsContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{data?.totalAmount ?? 0}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Item Discount</Text>
              <Text style={styles.totalValue}>
                {data?.totalItemDiscount ?? 0}
              </Text>
            </View>
            <View style={styles.totalLastRow}>
              <Text style={styles.totalLabel}>Total Discount</Text>
              <Text style={styles.totalValue}>{data?.discountAmount ?? 0}</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total Amount</Text>
              <Text style={styles.grandTotalValue}>
                {data?.totalAmount ?? 0}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Thank you</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
