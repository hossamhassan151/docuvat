import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      to,
      docNumber,
      docType,
      total,
      currency,
      companyName,
    } = body;

    if (!to || !docNumber || !docType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const documentTitle =
      docType === "invoice"
        ? "Tax Invoice"
        : docType === "quotation"
        ? "Quotation"
        : "Purchase Order";

    const { data, error } = await resend.emails.send({
      from: "DOCUVAT <noreply@docuvat.com>",
      to: [to],
      subject: `${documentTitle} ${docNumber} from ${companyName}`,

      html: `
        <div style="font-family:Segoe UI,sans-serif;background:#f8fafc;padding:40px 20px;">
          <div style="max-width:600px;margin:auto;background:white;border-radius:18px;padding:40px;box-shadow:0 4px 30px rgba(0,0,0,.06);">

            <div style="text-align:center;margin-bottom:32px;">
              <div style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#10b981);padding:12px 20px;border-radius:14px;">
                <span style="color:white;font-size:20px;font-weight:800;letter-spacing:1px;">
                  DOCUVAT
                </span>
              </div>

              <h1 style="margin-top:20px;color:#0f172a;font-size:24px;font-weight:800;">
                ${documentTitle}
              </h1>

              <p style="color:#64748b;font-size:14px;margin-top:8px;">
                Professional business document generated securely
              </p>
            </div>

            <div style="background:#f1f5f9;border-radius:14px;padding:24px;margin-bottom:28px;">
              <table style="width:100%;border-collapse:collapse;">

                <tr>
                  <td style="padding:10px 0;color:#64748b;font-size:14px;">
                    Document Number
                  </td>

                  <td style="padding:10px 0;text-align:right;color:#0f172a;font-size:14px;font-weight:700;">
                    ${docNumber}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#64748b;font-size:14px;">
                    Company
                  </td>

                  <td style="padding:10px 0;text-align:right;color:#0f172a;font-size:14px;font-weight:700;">
                    ${companyName || "DOCUVAT Client"}
                  </td>
                </tr>

                <tr style="border-top:1px solid #e2e8f0;">
                  <td style="padding-top:18px;color:#0f172a;font-size:18px;font-weight:800;">
                    Total Amount
                  </td>

                  <td style="padding-top:18px;text-align:right;color:#3b82f6;font-size:20px;font-weight:900;">
                    ${Number(total || 0).toLocaleString("en-AE", {
                      minimumFractionDigits: 2,
                    })} ${currency || "AED"}
                  </td>
                </tr>

              </table>
            </div>

            <p style="color:#475569;font-size:14px;line-height:1.8;margin-bottom:28px;">
              Your document has been generated successfully using DOCUVAT.
              Please review the attached file carefully and contact the sender
              directly for any additional details or modifications.
            </p>

            <div style="padding-top:24px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="font-size:12px;color:#94a3b8;margin:0;">
                Generated with
                <a href="https://www.docuvat.com"
                  style="color:#3b82f6;text-decoration:none;font-weight:600;">
                  DOCUVAT
                </a>
                · Smart Business Documents Platform
              </p>
            </div>

          </div>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);

      return NextResponse.json(
        { error: "Email sending failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}