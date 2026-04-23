import { groq } from 'next-sanity'

export const homePageQuery = groq`
  {
    "settings": *[_type == "siteSettings" && language == $lang][0],
    "projects": *[_type == "project" && language == $lang] | order(order asc) {
      ...,
      "staticImageUrl": coalesce(
        staticImageFallback,
        select(
          slug.current == "slicecom" => "/cs-slicecom-hero.png",
          slug.current == "sabesp" => "/sabesp/login-siga-modulo-tac.png",
          slug.current == "sigaf" => "/sigaf/inicio-cgesc.png",
          slug.current == "metro" => "/metro/login.png",
          slug.current == "myphone" => "/myphone/home.png",
          slug.current == "castforme" => "/castforme/dashboard.png",
          "/cs-slicecom-hero.png"
        )
      )
    },
    "philosophy": *[_type == "philosophy" && language == $lang][0],
    "timeline": *[_type == "timeline" && language == $lang] | order(order asc),
    "contact": *[_type == "contact" && language == $lang][0]
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && language == $lang][0] {
    _id,
    title,
    slug,
    tag,
    shortDescription,
    coverImage,
    coverBackgroundColor,
    projectType,
    ctaLabel,
    "staticImageUrl": coalesce(
      staticImageFallback,
      select(
        slug.current == "slicecom" => "/cs-slicecom-hero.png",
        slug.current == "sabesp" => "/sabesp/login-siga-modulo-tac.png",
        slug.current == "sigaf" => "/sigaf/inicio-cgesc.png",
        slug.current == "metro" => "/metro/login.png",
        slug.current == "myphone" => "/myphone/home.png",
        slug.current == "castforme" => "/castforme/dashboard.png",
        "/cs-slicecom-hero.png"
      )
    ),
    "caseStudy": {
      ...,
      ...caseStudy,
      "staticHeroImageFallback": coalesce(
        caseStudy.staticHeroImageFallback,
        select(
          slug.current == "slicecom" => "/cs-slicecom-hero.png",
          slug.current == "sabesp" => "/sabesp/login-siga-modulo-tac.png",
          slug.current == "sigaf" => "/sigaf/inicio-cgesc.png",
          slug.current == "metro" => "/metro/login.png",
          slug.current == "myphone" => "/myphone/home.png",
          slug.current == "castforme" => "/castforme/dashboard.png",
          "/cs-slicecom-hero.png"
        )
      )
    }
  }
`
