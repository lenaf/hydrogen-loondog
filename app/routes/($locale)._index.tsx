import { defer, type LoaderArgs } from '@shopify/remix-oxygen';
import { Suspense } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { AnalyticsPageType } from '@shopify/hydrogen';
import { flattenConnection, Image, Money, useMoney } from '@shopify/hydrogen';

import { ProductSwimlane, FeaturedCollections, Hero, Section } from '~/components';
import { MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '~/data/fragments';
import { getHeroPlaceholder } from '~/lib/placeholders';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';

export const headers = routeHeaders;

export async function loader({ params, context }: LoaderArgs) {
  const { language, country } = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, { status: 404 });
  }

  const { shop, hero } = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: { handle: 'magnets' },
  });

  console.log(shop,)

  const seo = seoPayload.home();

  return defer({
    shop,
    primaryHero: hero,
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    featuredProducts: context.storefront.query(
      HOMEPAGE_FEATURED_PRODUCTS_QUERY,
      {
        variables: {
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      },
    ),
    secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    }),
    featuredCollections: context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    }),
    tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    }),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
    seo,
  });
}

export default function Homepage() {
  const {
    primaryHero,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
  } = useLoaderData<typeof loader>();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);
  console.log(primaryHero)

  return (
    <>
      {primaryHero && (
        <Hero {...primaryHero} top loading="eager" />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/10C152A3-4728-40FC-8968-DF0A6C011A3A_1_105_c.jpg?v=1692539790' }}
          alt={'dog magnet'}
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/3DEF5875-3918-4690-8D1C-6415331FC632_1_105_c.jpg?v=1692539790' }}
          alt={'cat magnet'}
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/5FDF434B-D2F7-4491-B224-0138A06EC222_1_201_a_28904d9a-4069-413b-9483-e4da1b22a3cc.heic?v=1692552562' }}
          alt={'dog magnet'}
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/684436BF-717E-4CFB-9653-ECF3608C12AA_1_105_c.jpg?v=1692552550' }}
          alt={'cat magnet'}
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/CE83AA1A-8E94-406F-A1D9-5B433834AF2B_1_105_c.jpg?v=1692552346' }}
          alt={'dog magnet'}
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/C8A3F0AE-B8D7-45C3-A74C-F92D5530A814_1_105_c.jpg?v=1692552575' }}
          alt={'cat magnet'}
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/D5F5B72F-CB05-4EC1-BB12-76F173824691_1_105_c_c41db1a4-3e27-40f6-8588-b4dffb2c1cbc.jpg?v=1692552284' }}
          alt={'dog magnet'}
        />
        <Image
          aspectRatio="1"
          data={{ url: 'https://cdn.shopify.com/s/files/1/0571/2923/8571/files/5B565BF8-BA26-425B-8B34-24BD0C5942FD_1_201_a.heic?v=1693075312' }}
          alt={'dog magnet'}
        />
      </div>
      {/* {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {({ products }) => {
              if (!products?.nodes) return <></>;
              return (
                <ProductSwimlane
                  products={products}
                  title="Featured Products"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({ hero }) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}

      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({ collections }) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections}
                  title="Collections"
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({ hero }) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )} */}
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    image {
      url
      altText
      width
      height
    }
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    metafield(namespace: "hero", key: "byline"){
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
` as const;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/2023-07/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/2023-07/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
` as const;
