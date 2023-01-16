<template>
  <li :class="{ relative: children }">
    <button
      v-if="children"
      id="dropdownNavbarLink"
      @click="toggleDropdown(`${menu.name}Dropdown`)"
      class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
    >
      {{ menu.name }}
      <svg
        class="w-5 h-5 ml-1"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <div
      v-if="children"
      :id="`${menu.name}Dropdown`"
      class="absolute left-0 translate-x-[-40%] z-10 font-normal bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 transition-all inActiveToggle"
    >
      <ul
        class="py-1 text-sm text-gray-700 dark:text-gray-400"
        aria-labelledby="dropdownLargeButton"
      >
        <NavLink
          child="true"
          v-for="item in children"
          :menu="item"
          :key="item.name"
        />
      </ul>
    </div>
    <RouterLink
      :to="menu.link"
      v-else-if="child"
      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      aria-current="page"
    >
      {{ menu.name }}
    </RouterLink>
    <RouterLink
      :to="menu.link"
      v-else
      class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent"
      aria-current="page"
    >
      {{ menu.name }}
    </RouterLink>
  </li>
</template>

<script>
export default {
  name: "NavLink",
  props: ["menu", "children", "child"],
  methods: {
    toggleDropdown(target) {
      const elmDropdown = this.$el.querySelector(`#${target}`);
      if (elmDropdown.classList.contains("activeToggle")) {
        elmDropdown.classList.remove("activeToggle");
        elmDropdown.classList.add("inActiveToggle");
      } else {
        elmDropdown.classList.remove("inActiveToggle");
        elmDropdown.classList.add("activeToggle");
      }
    },
  },
};
</script>

<style scoped>
.activeToggle {
  @apply opacity-100;
}

.inActiveToggle {
  @apply opacity-0;
}
</style>
