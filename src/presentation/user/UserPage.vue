<script setup lang="ts">
import {
  RiArrowRightSLine,
  RiSettings2Fill,
  RiShieldFill,
  RiUser2Fill,
} from "vue-remix-icons";
import Button from "../../core/Button.vue";
import AccountSettingCard from "./AccountSettingCard.vue";

function handleClick() {
  window.open("https://github.com/duduBTW", "_blank");
}
</script>

<template>
  <div class="w-[800px] mx-auto px-4 pt-6">
    <h2 class="text-lg font-medium mb-6">Accounts</h2>
    <div class="flex items-center gap-6">
      <div class="w-20 h-20 rounded-full overflow-hidden">
        <img
          src="https://pbs.twimg.com/profile_images/1620171210352128000/sOhJS_q8_400x400.jpg"
          class="object-cover w-full h-full"
        />
      </div>
      <div class="flex-1 text-start">
        <div class="font-medium text-xl">DuduBTW</div>
        <div class="text-zinc-300 line-clamp-1 text-sm mt-1">
          dudubtway@gmail.com - Connected via gitHub
        </div>
      </div>
      <Button variant="secondary" @click="handleClick()">
        View GitHub Account
      </Button>
    </div>

    <div class="mt-10 flex flex-col gap-2">
      <AccountSettingCard class="gap-5">
        <RiSettings2Fill class="w-4" />
        <div class="flex-1 flex justify-between">
          <div class="text-start flex flex-col">
            <div class="font-medium">Content</div>
            <div class="text-sm text-zinc-400">dukcc</div>
          </div>
          <RiArrowRightSLine class="w-4" />
        </div>
      </AccountSettingCard>
      <AccountSettingCard class="gap-5">
        <RiShieldFill class="w-4" />
        <div class="flex-1 flex justify-between">
          <div class="font-medium">Manage Trusted Extensions</div>
          <RiArrowRightSLine class="w-4" />
        </div>
      </AccountSettingCard>
      <AccountSettingCard class="gap-5">
        <RiUser2Fill class="w-4" />
        <div class="flex-1 flex justify-between">
          <div class="font-medium">Sign Out</div>
          <RiArrowRightSLine class="w-4" />
        </div>
      </AccountSettingCard>
    </div>
  </div>
</template>
