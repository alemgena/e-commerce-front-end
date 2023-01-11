import { AiOutlineHome, AiOutlinePercentage } from 'react-icons/ai';
import { BiFootball } from 'react-icons/bi';
import { BsBook, BsLaptop } from 'react-icons/bs';
import { FaBaby, FaRedhat } from 'react-icons/fa';
import { FiHeadphones, FiMonitor } from 'react-icons/fi';
import { GiLargeDress } from 'react-icons/gi';
import { ImMobile } from 'react-icons/im';
import { IoShirtOutline, IoShirtSharp } from 'react-icons/io5';
import { MdOutlineToys } from 'react-icons/md';
import { RiFireLine, RiHeartPulseLine } from 'react-icons/ri';

const menuItems = [
  {
    category: 'clothing',
    icon: IoShirtOutline,
    categoryImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
    productsGroup: [
      {
        title: 'T-shirt',
        subImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
        subtitles: ['shirt', 'pants', 'tie', 'tShirt', 'shoes', 'jeans'],
      },
      {
        title: 'Suit',
        icon: FaBaby,
        subImg: 'fc3258b666e68f9ba7595f87b5c035ef.png',
        subtitles: ['overalls', 'mittens', 'babyApron', 'shoes', 'tShirt'],
      },
      {
        title: 'Jackets',
        subImg: 'Cargo-Pant-Free-Download-PNG.png',
        icon: FaRedhat,
        subtitles: ['watch', 'wallet', 'hat', 'belt'],
      },
    ],
  },

  {
    category: 'Trousers',
    icon: IoShirtOutline,
    categoryImg: 'running_shoes_PNG5816.png',
    productsGroup: [
      {
        title: 'men',
        icon: IoShirtSharp,
        subImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
        subtitles: ['shirt', 'pants', 'tie', 'tShirt', 'shoes', 'jeans'],
      },
      {
        title: 'child',
        icon: FaBaby,
        subImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
        subtitles: ['overalls', 'mittens', 'babyApron', 'shoes', 'tShirt'],
      },
      {
        title: 'other',
        icon: FaRedhat,
        subImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
        subtitles: ['watch', 'wallet', 'hat', 'belt'],
      },
    ],
  },

  {
    category: 'Makeup',
    categoryImg: '606.png',
    icon: MdOutlineToys,
    productsGroup: [
      {
        mainCategory: 'Shoes',
        title: 'women',
        subImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
        icon: GiLargeDress,
      },
    ],
  },
  {
    category: 'Furniture',
    categoryImg: 'running_shoes_PNG5816.png',
    icon: RiHeartPulseLine,
  },
  {
    category: 'Electronics',
    icon: BsLaptop,
    categoryImg: 'laptop-transparent-png-pictures-icons-and-png-40.png',
    productsGroup: [
      {
        mainCategory: 'Electronics',
        title: 'laptop',
        icon: BsLaptop,
        subtitles: [
          'asus',
          'apple',
          'dell',
          'lenovo',
          'samsung',
          'hp',
          'huawei',
          'acer',
          'msi',
        ],
      },
      {
        title: 'mobile',
        subImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
        icon: ImMobile,
        subtitles: [
          'samsung',
          'apple',
          'nokia',
          'xiaomi',
          'motorola',
          'lg',
          'sony',
        ],
      },
      {
        title: 'computer',
        icon: FiMonitor,
        subImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
        subtitles: ['monitor', 'mouse', 'keyboard', 'hard'],
      },
      {
        title: 'other',
        icon: FiHeadphones,
        subtitles: ['tablet', 'powerBank', 'speaker', 'headphones'],
        subImg: 'tbT6LP-red-women-dress-clothes-clipart-transparent.png',
      },
    ],
  },
  { category: 'Sport', categoryImg: 'Sport_balls.svg.png' },
  { category: 'Babies', categoryImg: '2432.png' },
  { category: 'Health', categoryImg: '1523.png' },
];

export default menuItems;

export const extraMenu = [
  { title: 'Featured Products', icon: AiOutlinePercentage, href: '/offers' },
  { title: 'Best Selling', icon: RiFireLine, href: '/' },
];
