import {create} from 'zustand'
import {devtools, persist , createJSONStorage} from 'zustand/middleware'

let storeS = (set) =>({
    sy:{},
    addPisSy:(syS) =>
    set((state) => ({sy:syS})),
     

    pisID:{},
    addPisID:(idPIS) =>
    set((state) => ({pisID:idPIS})),


    pb:{},
    addPersonalbg:(personalbg) =>
    set((state) => ({pb:personalbg})),

    fb:{},
    addFamilybg:(familylbg) =>
    set((state) => ({fb:familylbg})),

    sib:[],
    addSiblings:(siblings) =>
    set((state) => ({sib:siblings})),

    marital:[],
    addMaritalS:(marital) =>
    set((state) => ({marital:marital})),

    educBG:[],
    addeducBG:(educcbg) =>
    set((state) => ({educBG:educcbg})),

    educBG2:[],
    addeducBG2:(educcbg2) =>
    set((state) => ({educBG2:educcbg2})),

    aDDuhc:[],
    addUniqueHealthCosult:(addUHC) =>
    set((state) => ({aDDuhc:addUHC})),

    homeS:[],
    addHomeS:(img) =>
    set((state) => ({homeS:img})),

    logout:(s)=>
    set((state)=>( {sy:{}})),
    logout1:(s)=>
    set((state)=>( {pisID:{}})),
    logout2:(s)=>
    set((state)=>( {pb:{}})),
    logout3:(s)=>
    set((state)=>( {fb:{}})),
    logout4:(s)=>
    set((state)=>( {sib:{}})),
    logout5:(s)=>
    set((state)=>( {marital:{}})),
    logout6:(s)=>
    set((state)=>( {educBG:{}})),
    logout7:(s)=>
    set((state)=>( {educBG2:{}})),
    logout8:(s)=>
    set((state)=>( {aDDuhc:{}}))


})

storeS = devtools(storeS)
storeS = persist(storeS, {name: 'userPIS', storage: createJSONStorage(() => sessionStorage)})

const useStorePIS = create(storeS)

export default useStorePIS;