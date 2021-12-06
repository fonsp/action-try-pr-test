export const generate_comment = (context) => {
  let codes = [
    `import Pkg`,
    `Pkg.activate(temp=true)`,
    `Pkg.add(url="${context.payload.pull_request.head.repo.html_url}", rev="${context.payload.pull_request.head.ref}")`,
    `using ${context.payload.repository.name.replace(/\.jl$/,"")}`,
  ]

  let notebook_file = `### A Pluto.jl notebook ###\n# v0.17.2\n\nusing Markdown\nusing InteractiveUtils\n\n# ╔═╡ 0951578e-56e7-11ec-13a1-bd41c3606868\nbegin\n${
    codes.map(s => "\t" + s).join("\n")
  }\nend\n\n# ╔═╡ fdc0bf81-b4ff-4e8b-b509-cf5972e2918e\n\n\n# ╔═╡ Cell order:\n# ╠═0951578e-56e7-11ec-13a1-bd41c3606868\n# ╠═fdc0bf81-b4ff-4e8b-b509-cf5972e2918e`

  
  let binder_url = `https://binder.plutojl.org/open?url=${
    encodeURIComponent(encodeURIComponent(await base64url(notebook_file)))
  }`

  let long_result = `
  ## Try this Pull Request!
  Open Julia and type:
  \`\`\`jl
  ${codes.map(s => "julia> " + s).join("\n")}
  \`\`\`

  *Or run this code in your browser: [![Run with binder](https://mybinder.org/badge_logo.svg)](${binder_url})*
  `;

  return long_result
}


const base64url = data => new Promise((r) => {
    const reader = new FileReader()
    reader.onload = () => r(reader.result)
    reader.readAsDataURL(new Blob([data]))
})
