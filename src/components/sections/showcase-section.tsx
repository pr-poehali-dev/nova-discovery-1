import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const showcaseImages: { src: string; label: string; images?: string[] }[] = [
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/fb33528e-58ac-46fa-baa0-0332021c1f7f.png",
    label: "Антарес · Интеграция 2026",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/fb33528e-58ac-46fa-baa0-0332021c1f7f.png",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d1607047-5064-429f-9d17-3a17926964d9.jfif",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/dec915ae-ae2d-4dfb-af73-0e78335f4599.jfif",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e082973b-609c-4da1-8055-f5a947a42576.jfif",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/934cde5d-e36d-4898-95c1-b6ec6d3750ab.jfif",
    ],
  },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/013fe6dd-d9d8-43eb-abb1-263c8637a398.png",
    label: "Family Cosmetics · Интершарм Весна 2026",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/013fe6dd-d9d8-43eb-abb1-263c8637a398.png",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/6be5f3ed-5e9b-4c71-af52-5181974f54e5.jfif",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d2e63de7-5dcd-4ce8-9802-50545b0fb19d.jfif",
    ],
  },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e8fb3bc7-4eb4-41f3-8d4f-541d25f212f9.jpg",
    label: "Frambini · Продэкспо 2026",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e8fb3bc7-4eb4-41f3-8d4f-541d25f212f9.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/025782b1-9764-4ada-ab87-ac6a82afbee5.jfif",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/acdebdff-4abc-4907-9f56-4caf6ebf3d7a.png", label: "Философт · Rosbuild 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/663e2a32-4fd4-40ec-9d28-5df73819f999.png", label: "2M Group · Кабекс 2026" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9a2fc39c-18de-4eaf-ac8c-88dda969002b.jpg",
    label: "ELCO Group · Рупластика 2026",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9a2fc39c-18de-4eaf-ac8c-88dda969002b.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/974f93f8-b94c-4df9-a62e-008f0026ea84.png",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/47006a91-0654-47f3-a78c-0b625ca5d45a.png",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d506ac1a-c544-4359-9afc-6f497925635d.jpg", label: "Moreto · Рупластика 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/1bfa17ff-6dc6-401e-96d3-9947a926443e.jpg", label: "Linksim · Рупластика 2026" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9f944ea8-2600-4401-9eb2-fba94620ad54.jpg",
    label: "ТД Аскания · Продэкспо 2026",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9f944ea8-2600-4401-9eb2-fba94620ad54.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c929990e-7961-49da-8d6e-e196d8755da8.png",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a2c50935-ea85-4003-b541-98c78efcbd75.png",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/343bd04c-b2fb-410e-a965-843c2c0590b4.png",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/30034f03-2f6f-4998-8ff3-a67e10a7098a.png",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7aa28332-97df-4342-9907-cf967af98356.png",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/0dcf2ffc-0b95-48b4-9f71-6b573de9a3b3.jpg", label: "Насберри · Продэкспо 2026" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/056672b3-8fd8-419c-ad35-5aa307ff47bf.jfif",
    label: "Здравоохранение 2025",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/056672b3-8fd8-419c-ad35-5aa307ff47bf.jfif",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7b6bd074-ed2d-4408-9adc-b6411b140eec.jfif",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a483f7de-9eed-489a-9cf4-3203ed20d343.jpg", label: "Философт · Движение Экспо-Сочи 2025" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/48d32a7b-afe4-41c2-8fef-5b5ad3a085a1.jpg",
    label: "Frambini · WorldFood 2025",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/48d32a7b-afe4-41c2-8fef-5b5ad3a085a1.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a8d2a219-698c-47b5-9a92-aaa0cb5da7c0.png",
    ],
  },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a46ac291-6f4d-4e7e-af44-3498168c84a4.jpg",
    label: "B-flexy · Интершарм 2025",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a46ac291-6f4d-4e7e-af44-3498168c84a4.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/06591754-5041-4acd-be1d-1ecfef8d0188.png",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c69fea19-6ec1-4600-83a6-91c08e17ca23.jpg", label: "Kelli Group · HouseHold 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7fb1266b-1e77-413b-a5ba-61574fc772d9.jpg", label: "Артак · БИОТ 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/84595748-1240-403d-8c2e-32a346ca96df.jpg", label: "Артак · БИОТ 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/aeab5ef8-b23b-431c-ad31-bfbdb1a9a538.jpg", label: "Черкизово · Gastreet 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e9ee4865-1327-41a4-837c-9132ecf57262.jpg", label: "Философт · Rosbuild 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/07809357-ed72-42ac-83db-d73a6056e5ec.jpg", label: "БМ Сервис · Росупак 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/855304dc-1cee-4977-b17b-3e3eff330b3f.jpg", label: "ТД БМсервис · Росупак 2025" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a6c8c23b-1db2-4598-a710-863f9a04ec03.jpg",
    label: "Sofi De Marko · HomeTextile&Design 2024",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a6c8c23b-1db2-4598-a710-863f9a04ec03.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/1d0eb245-374b-45b9-8c94-853510235c9c.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7202dabc-81c0-47aa-9c42-6bf6fb366b46.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a6143e2c-f382-4f0e-a088-ad46e4bebb12.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/df809fbb-aa5c-41e4-955a-6c9115838383.jpg",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d4b77fd8-7b55-4c4b-98b9-8fd357797e09.jpeg", label: "Эксперт · Металлообработка 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/41f39706-42a1-43ba-86f7-ee007e236987.jpg", label: "Ola Dom · ЦветыЭкспо 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/90dfcdab-162e-4f6e-b08b-97a44adfbc47.jpg", label: "Kelli · HouseHold 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/60936646-bb5a-49c6-8a16-aca24a1548fb.jpg", label: "Style · HouseHold 2024" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/fca3f111-981a-4200-b29b-09fcf98e6010.jpg",
    label: "ELCO · Рупластика 2024",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/fca3f111-981a-4200-b29b-09fcf98e6010.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/706b9973-ec90-48f8-8a5c-da4fa094eae3.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/96c27f90-858c-4140-b575-1c45afa6eb35.jpg",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ec010f90-5c8a-49a4-b75f-82ecc658b0a1.jpg", label: "Moretto · Рупластика 2024" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/65c00d66-c06a-446b-bc01-c80e97415980.jpeg",
    label: "Amenari · BarHub 2024",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/65c00d66-c06a-446b-bc01-c80e97415980.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/1573d766-acb3-4c78-98a9-168947e261ed.png",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/dfac0359-9774-4d08-bda6-7f0638cde591.png",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/5694377a-f639-49bb-a820-0980a2f00f65.jpg", label: "Amenari · CoffeeTeaCacaoExpo 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f3c6ddaf-0948-4f20-a294-2860464b4922.jpg", label: "Coffefest · CoffeeTeaCacaoExpo 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/cb08541e-fc82-47ae-9384-5d829c0dab1c.jpg", label: "Sofi de Marko · Hometextil&Design 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/6de327f6-79b1-478f-8595-4527a36460ad.jpg", label: "Neoterica · Ветконгресс 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/32a8ca95-1d97-43d4-b914-23fc65ff5de7.jpg", label: "ТД БМсервис · Росупак 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e0f4ed50-bd73-4a8b-ab75-b6d0f6e75d42.jpg", label: "2M Group · Связь 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/eacdb26f-c868-4a55-afb5-750ce22a7c7d.jpg", label: "Sky Agro · Агрос 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d7892db8-d0f7-43fe-9a61-c586623c7363.jpeg", label: "ГК Агробизнес · ЮгАгро 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c904bab4-c90e-46a0-8420-32e1d112cb41.jpg", label: "Sofi de Marko · Hometextil&Design 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/656d32b5-40a4-474d-8dae-7460df004275.jpg", label: "Агробизнес Микробиз · ЮгАгро 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a41bf376-149d-4bc9-936f-8d5639c11d4e.jpg", label: "Клеверпарк · ParkingRussia 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/616c2c72-5ba3-4834-8d18-cce6119cb4f5.jpg", label: "Kelli · HouseHold 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f185dd70-eb5c-46d7-a263-49ffb3988806.jpg", label: "Style · HouseHold 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/839047b4-2190-4f92-8425-39bcedf58716.jpg", label: "GroupAuto Russia · МИМС 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/72d8d00d-63db-4213-ad6e-8399f1a5339b.jpg", label: "Herbarista · BarHub 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e06b6d33-c4c5-44da-b230-b670771e026b.jpg", label: "Ролик Team · Интерткань 2023" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c5a21cd3-6111-4342-b2a4-51920802409f.jpeg", label: "Intekpro · NDT 2022" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e174076e-f9a2-42fd-9ecd-9277dce36607.jpeg",
    label: "Лукойл · Mining World 2022, Новокузнецк",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e174076e-f9a2-42fd-9ecd-9277dce36607.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/88f57568-5cee-4cb3-b909-b08846c3433e.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7c46f846-3e38-4c25-8e42-459f86845391.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/da41935c-413d-4f50-9bb2-b7766729c06e.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a7b8bb31-c259-498b-bb68-40c55ceb8d14.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/81d42df7-1c28-4618-a2d2-9bfc34679d34.jpeg",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/cb96e45d-69f7-44de-b948-4365c5588ce4.jpg", label: "Händle ZMB Braun · Rosbuild 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f1ebacb5-5b2e-4fc4-824e-95376bf831da.jpg", label: "Aesthetic Air · МирКлимата 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/08a7abd2-a6ee-4ac7-a23e-e0bfa17b04a8.jpg", label: "Арт-Ко · ModernBakery 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c93488f6-ab48-4ce1-af1b-c28ce1ba96c0.jpeg", label: "Ролик Team · Интерткань 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/3052bee9-c638-4d1b-a692-5c9210b6acdb.jpeg", label: "Gala Poly Graph · Текстильлегпром 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/394e5b26-2476-4d5a-a38f-c469ea3c2eeb.jpeg", label: "Kelli · HouseHold 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/29e65be9-61ed-4c4f-bc1a-c209690645c1.jpeg", label: "Sofi de Marko · Hometextil&Design 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/8e8c2052-46c1-466e-9c3f-ad0d47539c37.jpeg", label: "2Style · HouseHold 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/bd2bcf8e-e311-4e38-a776-c57ebb8d940f.jpeg", label: "Neva Line · МеталлЭкспо 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/74286f92-d6b5-45de-8473-90cd1c75b921.jpeg", label: "Металлист · МеталлЭкспо 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c0761c2e-2af5-4b8c-a41e-8f462a2d931c.jpeg", label: "Adams Chemicals · Pharmtech&Ingredient 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/17544036-be8b-4911-85ea-7fa9e3bbe28a.jpeg", label: "Herbarista · ПИР 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/3d7c42f2-13cc-4c8c-9046-e388e1d4904c.jpeg", label: "Amenari · ПИР 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f59c777e-6668-4841-b8e1-cf9899c67b38.jpeg", label: "Tiara Medical · Здравоохранение 2022" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e79be178-19be-46fd-ae60-d523e2a3472f.jpg", label: "Sofi de Marko · Hometextil&Design 2021" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e665b4a1-4917-4e3e-9fd7-9f0f988e2972.jpeg",
    label: "Турбулентность Дон · РосГазЭкспо 2021",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e665b4a1-4917-4e3e-9fd7-9f0f988e2972.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/1c61b92f-6e8c-489c-8d37-a761681cdc28.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e3553b6a-2569-4220-bc19-020b5757d8b3.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/842f3c7f-5db2-4b5b-8367-64bda0f85f7c.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c290cf8c-99e9-4638-a50d-7ccb65031653.jpeg",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/41fb5e4b-9cdb-4bce-9896-d5750d7bad6c.JPG", label: "Grégoire Besson · ЮгАгро 2021" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/bd570696-666f-4cb0-8e90-2adb75d641c6.JPG", label: "Столица полимеров · Рупластика 2020" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/40b9f0ea-b904-4a75-8ff8-75a651965dd5.jpg", label: "Alta Roma · Продэкспо 2020" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/1fc98a40-ff3d-4798-8d68-9801cbd0d516.jpg", label: "Style · HouseHold 2020" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9c51c0ff-6494-4c62-be57-4d68ee75aed1.jpg", label: "Kelli · HouseHold 2020" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/50b25acf-1d6f-444e-98ff-75a1747918a7.jpeg", label: "Заслон · МВМС 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/98ba9a8d-1834-4b2e-960a-551485421d4d.jpeg", label: "Турбулентность Дон · РосГазЭкспо 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/87304dbc-b5f4-4a2c-ab0f-d832e78fc1ee.jpeg", label: "ASAP · Агропродмаш 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/65c4ac12-f58f-476a-acee-0ab7cf9ea34d.jpeg", label: "Smartway · Конференция Сочи 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ad6e15f3-efb7-47d4-a493-08539f2b2e86.jpeg", label: "Rocadamed · ДенталЭкспо 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/70472652-d674-48ca-bf92-e1d15f629677.jpeg", label: "Style · HouseHold 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/870ca260-9398-4d73-8a10-b90651528286.jpeg", label: "Bonvini · ПИР 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/531afa46-d1be-4543-af31-a9c9b84c51bd.jpeg", label: "Kelli · HouseHold 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d038c4dc-583a-412f-a68d-a22dc7e5dd8a.JPG", label: "Brumex · МИМС 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/4592ee22-df28-4a44-99aa-5c804953fcbb.JPG", label: "Traffic · Комтранс 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/cc571d38-e5e2-4556-a031-e261d0fcb653.jpeg", label: "АО Заслон · МВМС 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/b43f4daa-b3e0-4dcc-9f86-21dae224d9b4.JPG", label: "Микрон · СЕМАТ 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/0242263d-5104-4a01-81bc-8158d6ba14a3.JPG", label: "Kelli · HouseHold 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/b57228ba-1332-4a0e-993a-0f915652b2b4.JPG", label: "Martika · ХаусХолд 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/44339852-5bb7-4649-bada-87481245a8d2.JPG", label: "Кубань Агротех · ЮгАгро 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/0c9943c6-fa69-4fbd-8193-7bddc953e563.jpg", label: "ЮгРАС · ЮгАгро 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7ce9c188-b4e7-4bff-995c-75be3b391c0e.JPG", label: "LAB+ · Росупак 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/6b14d1c4-183b-4f6f-8600-3cc163b446df.JPG", label: "Hangbo · Митекс 2019" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f6aeba7f-8b06-4bab-80b8-c04793025b61.JPG",
    label: "RBK money · RIV 2019",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f6aeba7f-8b06-4bab-80b8-c04793025b61.JPG",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/b9d40a7b-5f96-4609-b138-1aba5860764e.jpeg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/846908c4-360b-48e6-b00c-7dc24f86f07c.jpeg",
    ],
  },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/0c66295a-36e3-4376-a8e4-4a085e6f70f1.jpg",
    label: "Spro Systems · НатЭкспо 2019",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/0c66295a-36e3-4376-a8e4-4a085e6f70f1.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c570b5b6-ee84-46b7-8682-0a7509d59cac.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d0f0bb30-53a9-4817-8ad7-29f7c171ed28.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7970788f-9f3e-4514-bbb2-cb93d409868a.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d7b578e2-8737-41a2-ad93-872e9f566b70.jpg",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ef9d12e9-8838-472b-92f2-c5618dc55897.jpg", label: "Princess · Boat Show 2016" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/107d12f3-c524-41ab-adb1-9ed2afd74310.jpg", label: "Bajaj · Мотовесна 2016" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/b1588466-a8d4-444c-b235-f4dbe0c5f874.jpg", label: "Акмика · Агропродмаш 2015" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/43d14c09-c54d-4c5b-a640-dda0cc74f890.JPG", label: "Aristo · Мебель 2014" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/66a4ae7d-32f6-481d-8a11-54d1de5bc287.JPG", label: "Gidoe Rus · Росупак 2012" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/3a06b4f1-32ce-4320-ac9d-acd0540a254a.jpg", label: "Ravenol · MIMS 2012" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/64ca6931-519e-4db3-80c7-e8fc8898d05f.JPG", label: "FB Team · Подарки Гостинный двор 2010" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/835219a3-628e-4f8c-b199-1dfd4fec1789.jpg", label: "Smeg · Мебель 2010" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/6bcd1d31-5c2f-4e21-a963-169a94ab6d36.JPG", label: "Евростандарт · Мебель 2010" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/69140be9-5584-4bd8-b19a-4b384da336b0.JPG", label: "АйТи Ойл · СвязьЭкспоком 2009" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/cd23410b-b05f-4750-9877-6ac008c942d7.JPG", label: "Bissom · Подарки 2009" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d0bb67c6-7227-420c-88bf-3f0b2e8970f7.JPG", label: "Sobranie · Millionaire Fair 2009" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f4042bbe-e5ac-4eaf-bf7c-0b4c9870d780.jpg", label: "Раменская мебельная компания · ЕЕМ 2009" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/b78ba72c-421b-4b36-a1cd-e909c8e18ff1.jpg", label: "Continental · Комтранс 2008" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/769b24ad-9561-4132-a980-e08864e9c763.JPG", label: "Liqui Moly · Автосалон 2008" },
  {
    src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/66ee867e-eb38-4f3f-86c4-736209fadc3b.jpg",
    label: "Очаково · Продэкспо 2008",
    images: [
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/66ee867e-eb38-4f3f-86c4-736209fadc3b.jpg",
      "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/3820fb12-4309-4896-8b96-d06b99732b36.png",
    ],
  },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/74b87178-f69f-498d-b3ee-d065d44e3dcc.jpg", label: "Ремеко · Подарки 2008" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/010050dd-e35f-4a46-9a4c-0f2becf8042e.JPG", label: "ГруппаСвезз · Электро 2007" },
]

const TOTAL_SLOTS = 48
const placeholderCount = TOTAL_SLOTS - showcaseImages.length

export function ShowcaseSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [subIndex, setSubIndex] = useState(0)

  const currentItem = selectedIndex !== null ? showcaseImages[selectedIndex] : null
  const currentGallery = currentItem?.images ?? (currentItem ? [currentItem.src] : [])

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i - 1 + showcaseImages.length) % showcaseImages.length : null))
    setSubIndex(0)
  }, [])

  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i + 1) % showcaseImages.length : null))
    setSubIndex(0)
  }, [])

  const subPrev = useCallback(() => {
    setSubIndex((i) => (i - 1 + currentGallery.length) % currentGallery.length)
  }, [currentGallery.length])

  const subNext = useCallback(() => {
    setSubIndex((i) => (i + 1) % currentGallery.length)
  }, [currentGallery.length])

  useEffect(() => {
    if (selectedIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (currentGallery.length > 1) subPrev()
        else prev()
      }
      if (e.key === "ArrowRight") {
        if (currentGallery.length > 1) subNext()
        else next()
      }
      if (e.key === "Escape") setSelectedIndex(null)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [selectedIndex, prev, next, subPrev, subNext, currentGallery.length])

  return (
    <section id="projects" className="bg-background px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Наши проекты
        </motion.p>
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Реализованные стенды
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {showcaseImages.map((item, i) => (
            <motion.div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              onClick={() => { setSelectedIndex(i); setSubIndex(0) }}
              data-clickable
            >
              <motion.img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              {item.images && item.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full">
                  +{item.images.length - 1}
                </div>
              )}
              {/* Подпись при наведении */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm md:text-base font-bold leading-tight">{item.label}</p>
              </div>
            </motion.div>
          ))}

          {Array.from({ length: placeholderCount }).map((_, i) => (
            <motion.div
              key={`ph-${i}`}
              className="relative aspect-square rounded-xl overflow-hidden bg-secondary"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: ((showcaseImages.length + i) % 4) * 0.07 }}
            >
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-xs">
                Фото {showcaseImages.length + i + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {showcaseImages.length} из {TOTAL_SLOTS} фото загружено — пришли остальные, я добавлю
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.button
              className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedIndex(null)}
              data-clickable
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => { e.stopPropagation(); currentGallery.length > 1 ? subPrev() : prev() }}
              data-clickable
            >
              <ChevronLeft className="w-7 h-7" />
            </motion.button>

            <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedIndex}-${subIndex}`}
                  src={currentGallery[subIndex]}
                  alt={showcaseImages[selectedIndex].label}
                  className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
              <motion.p
                key={`label-${selectedIndex}`}
                className="text-white font-bold text-lg md:text-xl text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {showcaseImages[selectedIndex].label}
              </motion.p>
              {currentGallery.length > 1 && (
                <div className="flex gap-2">
                  {currentGallery.map((_, gi) => (
                    <div
                      key={gi}
                      className={`w-2 h-2 rounded-full transition-colors ${gi === subIndex ? "bg-white" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <motion.button
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => { e.stopPropagation(); currentGallery.length > 1 ? subNext() : next() }}
              data-clickable
            >
              <ChevronRight className="w-7 h-7" />
            </motion.button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {selectedIndex + 1} / {showcaseImages.length}
              {currentGallery.length > 1 && <span> · фото {subIndex + 1}/{currentGallery.length}</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}