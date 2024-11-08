<script setup lang="ts">
import {Tailwind, Html} from '@vue-email/components';
import SomeComponent from "~/components/some-component.vue";
</script>

<template>
  <!-- Remove Tailwind and it works -->
  <!-- OR remove <SomeComponent /> and it works -->
  <Tailwind>
    <Html>
    Root: {{ $t('hello') }}
    Child:
    <SomeComponent/>
    </Html>
  </Tailwind>
</template>