import { useEffect, useState } from "react";
import { fetchImages } from "./api";
const types_Trancerate = [
    { eng:"normal",jap:"ノーマル"},
    { eng:"fire",jap:"ほのお"},
    { eng:"water",jap:"みず"},
    { eng:"grass",jap:"くさ"},
    { eng:"electric",jap:"でんき"},
    { eng:"ice",jap:"こおり"},
    { eng:"psychic",jap:"エスパー"},
    { eng:"fighting",jap:"かくとう"},
    { eng:"poison",jap:"どく"},
    { eng:"ground",jap:"じめん"},
    { eng:"flying",jap:"ひこう"},
    { eng:"bug",jap:"むし"},
    { eng:"rock",jap:"いわ"},
    { eng:"ghost",jap:"ゴースト"},
    { eng:"dragon",jap:"ドラゴン"},
    { eng:"dark",jap:"あく"},
    { eng:"steel",jap:"はがね"},
    { eng:"fairy",jap:"フェアリー"},
]

const ability_Trancerate =[
    {en:"hp",ja:"たいりょく"},
    {en:"attack",ja:"こうげき"},
    {en:"defense",ja:"ぼうぎょ"},
    {en:"special-attack",ja:"とくこう"},
    {en:"special-defense",ja:"とくぼう"},
    {en:"speed",ja:"すばやさ"},
]

function Header() {
    return (
        <section class="hero is-primary">
        <div class="hero-body">
          <p class="title">
            ポケモンのタイプと種族値検索サイト
          </p>
          <p class="subtitle">
            ポケモン好きのためのサイト！ついでにポケモンの英語名も覚えよう！
          </p>
        </div>
      </section>  
    );
}
  
// function Image(props) {
//     return (
//       <div className="card">
//         <div className="card-image">
//           <figure className="image">
//             <img src={props.src} alt = "cute dog" />
//           </figure>
//         </div>
//       </div>
//     );
// }

function Loading() {
    return <p>Loading...</p>;
}

// function Gallery(props) {
//     const {urls} = props;
//     console.log(urls)
//     if (urls == null) {
//         return <Loading />;
//     }
//     return (
//       <div className="columns is-vcentered is-multiline">
//         {urls.map((url) => {
//             return (
//                 <div key={url} className="column is-3">
//                     <Image src = {url} />
//                 </div>
//             );
//         })}
//         </div>
//     );
// }

// function Form(props) {
//     function handleSubmit(event) {
//         event.preventDefault();
//         const { poke } = event.target.elements;
//         props.onFormSubmit(poke.value);
//     }
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div className="field has-addons">
//                     <div className="control is-expanded">
//                         <div className="select is-fullwidth">
//                             <select name="poke" defaultValue="shiba">
//                                 <option value="shiba">Shiba</option>
//                                 <option value="akita">Akita</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="control">
//                         <button type="Submit" className="button is-dark">
//                             Reload
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }


  
function Main() {
    const [name, setName] = useState(null);
    const [data, setData] = useState(null);
    const [stats, setStats] = useState(null);
    const [text, setText] = useState('');
    const [types, setTypes] = useState(null);
     
    
    
    const handleChange=(e)=>{
        setName(e.target.value)
        
    }
    const handleClick=(event)=>{
        fetchImages(name.toLowerCase()).then((res) => {
            if(res){
            setData(res)
            setStats(res.stats)
            setTypes(res.types)
            }
            else{
                setData(null)
                setStats(null)
                setTypes(null)
                setText("not Found")
            }
    })
    }
    // const ja_name = types.filter((type) => {
    //     return type.type == stats.type
    // })
    console.log(types)
 
    return (
      <main>
        <section className="section has-background-info-light">
            <div className="field has-addons">
                <div className="control">
                    <input className="input is-link" type="text" onChange={handleChange} placeholder="ポケモンの名前(英語名)" />
                </div>
                <div className="control">
                    <a className="button is-info" onClick={handleClick}>
                        Search
                    </a>
                </div>
            </div>
            <div class="box"><ul>
            <li>ポケモンの名前は英語名で検索お願いします！</li>
            <li>例：ピカチュウ＝pikachu、ガブリアス＝garchomp、ザシアン＝zacian、ジャラランガ＝kommo-o、サンダー＝zapdos</li>
            </ul></div>
        
            
            <p><br></br></p>
            <p>例</p>
            <p>検索：pikachu(ピカチュウ)</p>
            <p>タイプ名：でんき</p>
            <p>たいりょく：35</p>
            <p>こうげき：55</p>
            <p>ぼうぎょ：40</p>
            <p>とくこう：50</p>
            <p>とくぼう：50</p>
            <p>すばやさ：90</p>
            <p><br></br></p>
            <div class="box">
            {types ? <div>{types.map((type,idx)=>{
                const jptype=types_Trancerate.filter((typeName)=> {
                    return typeName.eng == type.type.name
                })[0].jap;
                console.log(jptype)
                console.log("types")
                // console.log(type.type.name)
                // console.log(types_Trancerate)
                // console.log(types_Trancerate[`${type.type.name}`])
                    return(
                    <div>{jptype}</div>
                    )
            })}</div> : <div>{text}</div>}
            
            {stats ? <ul>{stats.map((stat,idx)=>{
                const jpability=ability_Trancerate.filter((abilityName)=>{
                    return abilityName.en == stat.stat.name
                })[0].ja;
                    return(
                    <li>{jpability}:{stat.base_stat}</li>
                    )
            })}</ul> : <div>{text}</div>}</div>
        </section>
      </main>
    );
}
  
function Footer() {
    return (
      <footer className="footer has-background-primary">
        <div className="content has-text-centered">
          <p>PokeAPIを使ってポケモン図鑑などを作ってみよう！</p>
          <p>
            <a href="https://pokeapi.co">PokeAPIはこちらから</a>
          </p>
        </div>
      </footer>
    );
}
  
function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
}
  
export default App;