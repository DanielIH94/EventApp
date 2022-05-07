import { HiOutlineDotsVertical } from "react-icons/hi"
import { RiLogoutBoxFill, RiUser3Fill } from "react-icons/ri"
import { BsFillCalendar3RangeFill, BsFillCalendarDateFill, BsCalendarDate } from "react-icons/bs"
import { RiUser5Fill } from "react-icons/ri"
import { HiHome } from "react-icons/hi"
import { AiOutlineSmile } from "react-icons/ai"
import { FaLongArrowAltRight, FaRegCommentDots } from "react-icons/fa"
import { BiChevronDown, BiChevronUp } from "react-icons/bi"

const icon = {
  more_info: HiOutlineDotsVertical,
  logout: RiLogoutBoxFill,
  app_logo: { 
    fill: BsFillCalendarDateFill, 
    outline: BsCalendarDate 
  },
  empty_avatar: RiUser5Fill,
  home: HiHome,
  events: BsFillCalendar3RangeFill,
  profile: RiUser3Fill,
  smiley: AiOutlineSmile,
  right_arrow: FaLongArrowAltRight,
  expand: BiChevronDown,
  hide: BiChevronUp,
  comments: FaRegCommentDots
}

export default icon