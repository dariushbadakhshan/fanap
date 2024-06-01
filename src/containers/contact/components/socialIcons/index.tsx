import { FaInstagram as Instagram } from 'react-icons/fa';
import { FaFacebook as Facebook } from 'react-icons/fa';
import { FaTelegram as Telegram } from 'react-icons/fa';
import { FaTwitter as Twitter } from 'react-icons/fa';
import { FaLinkedin as Linkedin } from 'react-icons/fa';
import { TbWorldWww as Website } from 'react-icons/tb';

import { ContactWaysEnum } from '@models';

type SocialIconsProps = {
  label?: ContactWaysEnum;
  color?: string;
  size?: string;
};

const SocialIcons = ({ label, color, size }: SocialIconsProps) => {
  switch (label) {
    case ContactWaysEnum.INSTAGRAM:
      return <Instagram color={color} size={size} />;

    case ContactWaysEnum.FACEBOOK:
      return <Facebook color={color} size={size} />;

    case ContactWaysEnum.TELEGRAM:
      return <Telegram color={color} size={size} />;

    case ContactWaysEnum.TWITTER:
      return <Twitter color={color} size={size} />;

    case ContactWaysEnum.LINKEDINE:
      return <Linkedin color={color} size={size} />;

    case ContactWaysEnum.WEBSITE:
      return <Website color={color} size={size} />;

    default:
      return <></>;
  }
};

export default SocialIcons;
