/**
 * @cockroachlabs/icons
 *
 * This index file serves as the difinitive list of the icons contained in the
 * icons package for cockroach labs ui. While all icons that are a part of this
 * collection are exported individually, there are also "sets" or groups of icons
 * with similar use cases and properties (that correspond to convinience
 * components in @cockroachlabs/ui-components/src/Icon).
 *
 * The current categorization of these icons is based on CRDB Design System v1.
 * See the "Iconography" section of this Figma file,
 * https://www.figma.com/file/B5AtEGdRbW3VxiBdg62TB8Xw/CRDB-Design-System-v1
 *
 *
 * System icons - Vector images containing a single color intended for
 * use at small sizes (8px -32px). Their single color allows them to have their
 * fill overridden with the design system intent colors.
 *
 * Pictograms (or Pictogram icons) - Vector images containing two colors (a
 * solid fill color and a transparent fill color) for use at medium sizes (36px
 * - 56px). The low number of colors allow the fill to be overridden with an
 * intent color. (At the time of writing only "primary" is defined, but any color
 * could be used as a `fill` override).
 *
 * Illustrations - More complex vector images containing multiple (3 or
 * more) fill colors for use at a large size (the size it was designed for).
 *
 * 3rd Party Icons - Multicolored vector images representing the logo of
 * an external company for use at small and medium sizes (16px - 56px)
 *
 * Credit Cards - Multicolored vector images representing a payment processor
 * for use at small sizes (16px - 32px)
 *
 * Flags - Multicolored vector images representing a geographic region for use
 * at small sizes (16px - 32px)
 *
 * Other - There are a small number of Pictogram icons that contain many colors
 * (or more accurately a single color and a gradient of colors) that behave as
 * Pictograms, but are not meant to have their fill overidden. This is not an
 * exported group.
 *
 */

/**
ooooo                                                     .
`888'                                                   .o8
 888  ooo. .oo.  .oo.   oo.ooooo.   .ooooo.  oooo d8b .o888oo  .oooo.o
 888  `888P"Y88bP"Y88b   888' `88b d88' `88b `888""8P   888   d88(  "8
 888   888   888   888   888   888 888   888  888       888   `"Y88b.
 888   888   888   888   888   888 888   888  888       888 . o.  )88b
o888o o888o o888o o888o  888bod8P' `Y8bod8P' d888b      "888" 8""888P'
                         888
                        o888o
*/

// System Icons
import ArrowLeft from "./components/ArrowLeft";
import ArrowRight from "./components/ArrowRight";
import ArrowUp from "./components/ArrowUp";
import ArrowDown from "./components/ArrowDown";
import Backup from "./components/Backup";
import Bell from "./components/Bell";
import Billing from "./components/Billing";
import Calendar from "./components/Calendar";
import Cancel from "./components/Cancel";
import CancelCircle from "./components/CancelCircle";
import CancelCircleFilled from "./components/CancelCircleFilled";
import CaretDown from "./components/CaretDown";
import CaretFilledDown from "./components/CaretFilledDown";
import CaretLeft from "./components/CaretLeft";
import CaretRight from "./components/CaretRight";
import CaretFilledRight from "./components/CaretFilledRight";
import CaretUp from "./components/CaretUp";
import Caution from "./components/Caution";
import CautionFilled from "./components/CautionFilled";
import Check from "./components/Check";
import CheckCircle from "./components/CheckCircle";
import CheckCircleFilled from "./components/CheckCircleFilled";
import CircleFilled from "./components/CircleFilled";
import Cluster from "./components/Cluster";
import Collapse from "./components/Collapse";
import Copy from "./components/Copy";
import Download from "./components/Download";
import Ellipsis from "./components/Ellipsis";
import EllipsisVertical from "./components/EllipsisVertical";
import Envelope from "./components/Envelope";
import ErrorCircleFilled from "./components/ErrorCircleFilled";
import ErrorCircle from "./components/ErrorCircle";
import Expand from "./components/Expand";
import EyeOff from "./components/EyeOff";
import Eye from "./components/Eye";
import Folder from "./components/Folder";
import Gear from "./components/Gear";
import GearFilled from "./components/GearFilled";
import FeatureFlags from "./components/FeatureFlags";
import HelpCircle from "./components/HelpCircle";
import HelpCircleFilled from "./components/HelpCircleFilled";
import InfoCircle from "./components/InfoCircle";
import InfoCircleFilled from "./components/InfoCircleFilled";
import Invalid from "./components/Invalid";
import Lightbulb from "./components/Lightbulb";
import List from "./components/List";
import Lock from "./components/Lock";
import LockFilled from "./components/LockFilled";
import MinusCircle from "./components/MinusCircle";
import Minus from "./components/Minus";
import Open from "./components/Open";
import Org from "./components/Org";
import Pencil from "./components/Pencil";
import Plus from "./components/Plus";
import PlusCircle from "./components/PlusCircle";
import PlusCircleFilled from "./components/PlusCircleFilled";
import Refresh from "./components/Refresh";
import Search from "./components/Search";
import Stack from "./components/Stack";
import Star from "./components/Star";
import Switch from "./components/Switch";
import Table from "./components/Table";
import Terminal from "./components/Terminal";
import Time from "./components/Time";
import User from "./components/User";
import World from "./components/World";

// Pictograms
import Add from "./components/Add";
import Email from "./components/Email";
import Globe from "./components/Globe";
import Location from "./components/Location";
import Monitoring from "./components/Monitoring";

// Illustrations
import MagnifyingGlass from "./components/MagnifyingGlass";
import Menu from "./components/Menu";
import Nodes from "./components/Nodes";
import NotFound from "./components/NotFound";
import SleepyMoon from "./components/SleepyMoon";

// 3rd Party Icons
import Aws from "./components/Aws";
import Azure from "./components/Azure";
import Datadog from "./components/Datadog";
import Gcp from "./components/Gcp";
import Github from "./components/Github";
import Google from "./components/Google";
import K3D from "./components/K3D";
import Microsoft from "./components/Microsoft";
import Slack from "./components/Slack";
import Zendesk from "./components/Zendesk";

// Credit Cards
import CreditCard from "./components/CreditCard";
import Visa from "./components/Visa";
import Amex from "./components/Amex";
import Dinersclub from "./components/Dinersclub";
import Discover from "./components/Discover";
import Jcb from "./components/Jcb";
import Mastercard from "./components/Mastercard";
import Unionpay from "./components/Unionpay";

// Country Flags
import Australia from "./components/Australia";
import Belgium from "./components/Belgium";
import Brazil from "./components/Brazil";
import Bahrain from "./components/Bahrain";
import Canada from "./components/Canada";
import Finland from "./components/Finland";
import France from "./components/France";
import Germany from "./components/Germany";
import HongKong from "./components/Hongkong";
import India from "./components/India";
import Indonesia from "./components/Indonesia";
import Ireland from "./components/Ireland";
import Japan from "./components/Japan";
import Korea from "./components/Korea";
import Netherlands from "./components/Netherlands";
import Poland from "./components/Poland";
import Singapore from "./components/Singapore";
import SouthAfrica from "./components/SouthAfrica";
import Sweden from "./components/Sweden";
import Switzerland from "./components/Switzerland";
import Taiwan from "./components/Taiwan";
import UnitedKingdom from "./components/UnitedKingdom";
import Usa from "./components/Usa";

// other
import Community from "./components/Community";
import Docs from "./components/Docs";
import Learning from "./components/Learning";
import Upload from "./components/Upload";

/**
oooooooooooo                                               .
`888'     `8                                             .o8
 888         oooo    ooo oo.ooooo.   .ooooo.  oooo d8b .o888oo  .oooo.o
 888oooo8     `88b..8P'   888' `88b d88' `88b `888""8P   888   d88(  "8
 888    "       Y888'     888   888 888   888  888       888   `"Y88b.
 888       o  .o8"'88b    888   888 888   888  888       888 . o.  )88b
o888ooooood8 o88'   888o  888bod8P' `Y8bod8P' d888b      "888" 8""888P'
                          888
                         o888o
*/

const SystemIcons = {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Backup,
  Bell,
  Billing,
  Calendar,
  CancelCircleFilled,
  CancelCircle,
  Cancel,
  CaretDown,
  CaretFilledDown,         // deprecated
  CaretFilledRight,        // deprecated
  CaretLeft,
  CaretRight,
  CaretUp,
  Caution,
  CautionFilled,
  Check,
  CheckCircle,
  CheckCircleFilled,
  CircleFilled,
  Cluster,
  Collapse,
  Copy,
  Download,
  Ellipsis,
  EllipsisVertical,
  Envelope,
  ErrorCircleFilled,
  ErrorCircle,
  Expand,
  EyeOff,
  Eye,
  Folder,
  Gear,
  GearFilled,
  FeatureFlags,
  HelpCircle,
  HelpCircleFilled,
  InfoCircle,
  InfoCircleFilled,
  Invalid,
  Lightbulb,
  List,
  LockFilled,
  Lock,
  MinusCircle,
  Minus,                   //deprecated
  Open,
  Org,
  Pencil,
  Plus,
  PlusCircle,
  PlusCircleFilled,
  Refresh,
  Search,
  Stack,
  Star,                    //deprecated
  Switch,
  Table,
  Terminal,
  Time,
  User,
  World,
};

const Pictograms = { Add, Email, Globe, Location, Monitoring };

const Illustrations = {
  MagnifyingGlass,
  Menu,
  Nodes,
  NotFound,
  SleepyMoon,
};

const ThirdParty = {
  Aws,
  Azure,
  Datadog,
  Gcp,
  Google,
  Github,
  K3D,
  Microsoft,
  Slack,
  Zendesk,
};

const Cards = {
  CreditCard,
  Visa,
  Amex,
  Dinersclub,
  Discover,
  Mastercard,
  Jcb,
  Unionpay,
};

const Flags = {
  Australia,
  Bahrain,
  Belgium,
  Brazil,
  Canada,
  Finland,
  France,
  Germany,
  HongKong,
  India,
  Indonesia,
  Ireland,
  Japan,
  Korea,
  Netherlands,
  Poland,
  Singapore,
  SouthAfrica,
  Sweden,
  Switzerland,
  Taiwan,
  UnitedKingdom,
  Usa,
};

export {
  // system icons
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Backup,
  Bell,
  Billing,
  Calendar,
  CancelCircleFilled,
  CancelCircle,
  Cancel,
  CaretDown,
  CaretFilledDown,
  CaretFilledRight,
  CaretLeft,
  CaretRight,
  CaretUp,
  Caution,
  CautionFilled,
  Check,
  CheckCircle,
  CheckCircleFilled,
  CircleFilled,
  Cluster,
  Collapse,
  Copy,
  Download,
  Ellipsis,
  EllipsisVertical,
  Envelope,
  ErrorCircleFilled,
  ErrorCircle,
  Expand,
  EyeOff,
  Eye,
  Folder,
  Gear,
  GearFilled,
  FeatureFlags,
  HelpCircle,
  HelpCircleFilled,
  InfoCircle,
  InfoCircleFilled,
  Invalid,
  Lightbulb,
  List,
  LockFilled,
  Lock,
  MinusCircle,
  Minus,
  Open,
  Org,
  Pencil,
  Plus,
  PlusCircle,
  PlusCircleFilled,
  Refresh,
  Search,
  Stack,
  Star,
  Switch,
  Table,
  Terminal,
  Time,
  User,
  World,
  // pictograms
  Add,
  Email,
  Globe,
  Location,
  Monitoring,
  MagnifyingGlass,
  Menu,
  Nodes,
  NotFound,
  SleepyMoon,
  // 3rd party
  Aws,
  Azure,
  Datadog,
  Gcp,
  Google,
  Github,
  K3D,
  Microsoft,
  Slack,
  Zendesk,
  // credit cards
  CreditCard,
  Visa,
  Amex,
  Dinersclub,
  Discover,
  Mastercard,
  Jcb,
  Unionpay,
  // flags
  Australia,
  Belgium,
  Brazil,
  Canada,
  Finland,
  France,
  Germany,
  HongKong,
  India,
  Ireland,
  Japan,
  Korea,
  Netherlands,
  Singapore,
  Sweden,
  Switzerland,
  Taiwan,
  UnitedKingdom,
  Usa,
  // sets,
  SystemIcons,
  Pictograms,
  ThirdParty,
  Cards,
  Flags,
  Illustrations,
  // other
  Community,
  Docs,
  Learning,
  Upload,
};
