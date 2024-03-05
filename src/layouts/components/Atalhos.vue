<script setup>
const atalhos = [
  {
    icon: "tabler-user",
    title: "Contactos",
    subtitle: "Ver Contactos",
    to: { name: "utilizadores" },
  },
  {
    icon: "tabler-book",
    title: "Cursos",
    subtitle: "Ensino Superior",
    to: { name: "pages-cursos" },
  },
  {
    icon: "tabler-smart-home",
    title: "Faculdades e Institutos",
    subtitle: "Instituicoes de Ensino",
    to: { name: "pages-instituicoes-ensino" },
  },

  {
    icon: "tabler-pencil",
    title: "Exames de Admissao",
    subtitle: "Preparacao ao ensino superior",
    to: { name: "pages-exames-admissao" },
  },
  {
    icon: "tabler-settings",
    title: "Settings",
    subtitle: "Account Settings",
    to: {
      name: "pages-definicoes-tab",
      params: { tab: "conta" },
    },
  },
  {
    icon: "tabler-help",
    title: "Help Center",
    subtitle: "FAQs & Articles",
    to: { name: "pages-ajuda" },
  },
];
</script>

<template>
  <Atalhos :atalhos="atalhos" />
</template>
