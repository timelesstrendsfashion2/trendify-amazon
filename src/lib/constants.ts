import { PRODUCT_CATEGORY } from "@prisma/client"
import type { Metadata } from "next"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export function magicEmail(url: string) {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" lang="en">
  
    <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    </head>
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Log in with this magic link
    </div>
  
    <body style="background-color:#ffffff">
      <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;padding-left:12px;padding-right:12px;margin:0 auto">
        <tbody>
          <tr style="width:100%">
            <td>
            <img alt="Trendify Logo" width="170" src=${
              SITE_URL + "/logo.png"
            } style="display:block;outline:none;border:none;text-decoration:none;object-fit:contain" />
              <h1 style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:24px;font-weight:bold;margin:40px 0;padding:0">Login</h1><a href=${url} style="color:#16a34a;text-decoration:underline;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;display:block;margin-bottom:16px" target="_blank">Click here to log in with this magic link</a>
              <p style="font-size:14px;line-height:24px;margin:24px 0;color:#ababab;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:14px;margin-bottom:16px">If you didn&#x27;t try to login, you can safely ignore this email.</p>
              <p style="font-size:12px;line-height:22px;margin:16px 0;color:#898989;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:12px;margin-bottom:24px"><a href=${SITE_URL} style="color:#898989;text-decoration:underline;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px" target="_blank">Trendify</a>, the all-in-one e-commerce platform.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  
  </html>
  `
}

export type Category = {
  name: string
  icon: string
  slug: PRODUCT_CATEGORY
}

export const CATEGORIES: Category[] = [
  {
    name: "Mobile accessories",
    slug: "MOBILE_ACCESSORIES",
    icon: "/mobile-accessories.png",
  },
  {
    name: "Electronics",
    slug: "ELECTRONICS",
    icon: "/electronics.png",
  },
  {
    name: "Fitness",
    slug: "FITNESS",
    icon: "/fitness.png",
  },
  {
    name: "Amazon Super Products",
    slug: "AMAZON_SUPER_PRODUCTS",
    icon: "/super.png",
  },
]

export const METADATA: Metadata = {
  title: "Trendify - Discover top-rated products from Amazon",
  description:
    "Discover curated selections of top-rated products from Amazon on Trendify! Explore an array of must-have items handpicked for you. Shop with confidence through our affiliate links, ensuring you get the best deals while supporting Trendify. Start your shopping journey today!",
  keywords: [
    "Amazon affiliate",
    "Amazon",
    "Amazon shopping",
    "Shopping",
    "Product curation",
    "Trendify app",
    "Shopping recommendations",
    "Top-rated products",
    "Online shopping",
    "Product discovery",
    "Affiliate marketing",
    "Shopping deals",
    "Trendy products",
    "Curated shopping",
    "Amazon products",
    "Product recommendations",
    "Shopping app",
    "Best deals",
    "Product selection",
    "Personalized shopping",
    "Amazon affiliate program",
    "Trendy items",
    "Online marketplace",
    "Shopping platform",
    "Product variety",
    "Deal hunting",
    "Discount shopping",
    "Savings app",
    "Shop and save",
    "Discover products",
    "E-commerce app",
    "Amazon storefront",
    "Shop smart",
    "Handpicked products",
    "Product catalog",
    "Shop with confidence",
    "Best-selling items",
    "Explore deals",
    "Save on purchases",
    "Smart shopping",
    "Find bargains",
    "Discover trending products",
  ],
}
