export default function TipePokemon({ name }) {
  return (
    <p
      className={`px-3 md:px-5 py-1 rounded-3xl font-black  border-4 
              type-${name} bg-[linear-gradient(to_bottom,rgb(var(--type-color)/0.8),rgb(var(--type-color-2)/0.8))]  text-[rgb(var(--type-text))]  border-[rgb(var(--type-color))]
              shadow-[0_0_6px_1px_rgb(var(--type-color))]`}
      
    >
      {name}
    </p>
  )
}