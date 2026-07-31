import { groq } from "next-sanity";

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    name,
    sku,
    summary,
    description,
    price,
    currency,
    isFeatured,
    isNew,
    isBestSeller,
    isActive,
    order,
    seoTitle,
    seoDescription,
    seoKeywords,
    "category": category->{
      "slug": slug.current,
      name,
      description,
      icon
    },
    "subcategory": subcategory->{
      "slug": slug.current,
      name
    },
    "brand": brand->{
      "slug": slug.current,
      name,
      "logo": logo.asset->url
    },
    "images": coalesce(images[] {
      "id": asset._ref,
      "url": asset->url,
      alt,
      isPrimary
    }, []),
    "videos": coalesce(videos[] {
      "id": _key,
      url,
      provider,
      title
    }, []),
    "documents": coalesce(documents[] {
      "id": _key,
      "url": asset->url,
      title,
      type
    }, []),
    "features": coalesce(features[] {
      "id": _key,
      title,
      description,
      icon
    }, []),
    "specifications": coalesce(specifications[] {
      "id": _key,
      group,
      key,
      value
    }, []),
    "applications": coalesce(applications[] {
      "id": _key,
      name,
      description
    }, [])
  }
`;

export const RELATED_PRODUCTS_QUERY = groq`
  *[_type == "product" && category->slug.current == $categorySlug && slug.current != $slug][0...4] | order(isFeatured desc, order asc) {
    "id": _id,
    "slug": slug.current,
    name,
    summary,
    price,
    isFeatured,
    isNew,
    "images": coalesce(images[isPrimary == true][0...1] {
      "url": asset->url,
      alt
    }, [])
  }
`;
