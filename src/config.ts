const getContactHref = (name: string, contact: string) => {
  let href;
  switch (name) {
    case "twitter":
      href = `https://twitter.com/${contact}`;
      break;
    case "github":
      href = `https://github.com/${contact}`;
      break;
    case "telegram":
      href = `https://t.me/${contact}`;
      break;
    case "email":
      href = `mailto:${contact}`;
      break;
    case "linkedin":
      href = `https://www.linkedin.com/in/${contact}`;
      break;
    case "instagram":
      href = `https://www.instagram.com/${contact}`;
      break;
    case "line":
      href = `line://ti/p/${contact}`;
      break;
    case "facebook":
      href = `https://www.facebook.com/${contact}`;
      break;
    case "gitlab":
      href = `https://www.gitlab.com/${contact}`;
      break;
    case "codepen":
      href = `https://www.codepen.io/${contact}`;
      break;
    case "youtube":
      href = `https://www.youtube.com/channel/${contact}`;
      break;
    case "soundcloud":
      href = `https://soundcloud.com/${contact}`;
      break;
    default:
      href = contact;
      break;
  }

  return href;
};

export const SiteConfig = {
  url: "https://yceffort.kr",
  pathPrefix: "/",
  title: "yceffort",
  subtitle: "yceffort",
  copyright: "yceffort © All rights reserved.",
  disqusShortname: "",
  postsPerPage: 5,
  googleAnalyticsId: "G-ND58S24JBX",
  useKatex: false,
  menu: [
    {
      label: "Posts",
      path: "/pages/1",
    },
    {
      label: "Tags",
      path: "/tags",
    },
    {
      label: "about",
      path: "/about",
    },
  ],
  author: {
    name: "yceffort",
    photo: "/profile.png",
    bio: "frontend engineer",
    contacts: {
      email: "root@yceffort.kr",
      facebook: "",
      telegram: "",
      twitter: getContactHref("twitter", "yceffort_dev"),
      github: getContactHref("github", "yceffort"),
      rss: "",
      linkedin: "",
      instagram: "",
      line: "",
      gitlab: "",
      codepen: "",
      youtube: "",
      soundcloud: "",
    },
  },
};
