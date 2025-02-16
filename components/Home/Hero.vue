<script setup lang="ts">
const { data: homepage } = await useHomepage()
</script>
<template>
    <header v-if="homepage" class="min-h-100vh w-full flex flex-col pb-16 pt-36">
        <div
             class="grid grid-cols-14 md:h-35vh reveal" style="animation-delay: 200ms;">
            <HeroText
                      v-if="homepage.hero"
                      :hero="homepage.hero"
                      col="start-2 span-12"
                      md:col="start-3 span-11" />
        </div>
        <div
             class="grid grid-cols-14 mt-16 md:mt-1/2c reveal" style="animation-delay: 400ms;">
            <div
                 col="start-2 span-10"
                 md:col="start-3 span-10"
                 class="intro mb-8 max-w-96 flex flex-col gap-3"
                 text="lg 2xl:xl"
                 font="serif extralight"
                 v-html="homepage.intro"></div>
            <Contacts
                      col="start-2 span-10"
                      md:col="start-3 span-4"
                      class="text-24px" />
        </div>
    </header>
</template>
<style>
.intro a {
    text-decoration: underline !important;
}

.reveal {
    animation: reveal 600ms theme('easing.power4-out') both;
    opacity: 0;
}

@keyframes reveal {
    from {
        transform: translateY(24px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>