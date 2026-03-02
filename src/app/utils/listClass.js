export const DEFAULT_CART = {
  main_container:
    "w-full h-full bg-zinc-800 rounded-2xl text-white shadow-lg flex flex-col overflow-visible",
  top_container: {
    class:
      "relative flex-1 flex flex-col items-center mt-1 pb-1 justify-center  mx-1 h-[80%] bg-[linear-gradient(to_bottom,rgb(var(--type-color)/0.08),rgb(var(--type-color-2)/0.08))] rounded-t-lg ",
    circle_styles: `circle-background absolute w-[75%]
    aspect-square  rounded-full flex items-center justify-center  bg-[linear-gradient(to_bottom,rgb(var(--type-color)/1)_50%,rgb(var(--type-color-2)/1)_50%)] shadow-[inset_0_-20px_35px_rgba(0,0,0,0.25),inset_0_15px_25px_rgba(255,255,255,0.25)]
    `,
    image_styles: 'pokemon-image w-[70%] transition-transform duration-500 -translate-y-1 '
  },
  bottom_container: {
    class:'w-full bg-zinc-700 p-3 rounded-b-lg ',
    container_name_id:''
  }
};
