import React, { useState, useMemo } from 'react';
import { Search, Package, Download, ArrowLeft, Plus, Wine, Filter, Grid, List } from 'lucide-react';

interface Product {
  code: string;
  description: string;
  images: string[];
  category: 'submenu1' | 'submenu2';
}

interface StockEntry {
  warehouse: string;
  code: string;
  description: string;
  quantity: number;
  unit: string;
}

const products: Product[] = [
  // Insumos Enológicos 1
  { code: 'IAD0170110', description: 'ACIDO CITRICO', images: ['acido_citrico.jpeg'], category: 'submenu1' },
  { code: 'IAD0010002', description: 'ACIDO CITRICO DERVINSA', images: ['acido_citrico_dervinsa.jpeg'], category: 'submenu1' },
  { code: 'IAD0010005', description: 'ACIDO MALICO L HUGESTONE', images: ['acido_malico_l.jpeg'], category: 'submenu1' },
  { code: 'IAD0010009', description: 'ACIDO METATARTARICO', images: ['acido_metatartarico.jpeg'], category: 'submenu1' },
  { code: 'IAD0010006', description: 'ACIDO TARTARICO DERVINSA', images: ['acido_tartarico.jpeg'], category: 'submenu1' },
  { code: 'GEN0100264', description: 'BENTONITA PLUXBENTON N', images: ['bentonita_pluxbenton_n.jpeg'], category: 'submenu1' },
  { code: 'GEN0120080', description: 'BIODECORGEL FREE AEB', images: ['biodecorgel_free_aeb.jpeg'], category: 'submenu1' },
  { code: 'GEN0120057', description: 'CARBON ACTIVADO', images: ['carbon_activado.jpeg'], category: 'submenu1' },
  { code: 'GEN0100081', description: 'CHIP AM 60% / 40% OAKVIN', images: ['chip_am_60_40.jpeg', 'chip_am_60_401.jpeg'], category: 'submenu1' },
  { code: 'GEN0100100', description: 'CHIP AM CUVÉE N°2 MT EVOAK', images: ['chip_am_cuvee_n_2_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100109', description: 'CHIP AM HEAVY TOASTED MT OAK MOR', images: ['chip_am_heavy_toasted_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100291', description: 'CHIP AM OAK MT OAK', images: ['chip_am_oak_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100078', description: 'CHIP AM PREMIUM MT OAK MOR', images: ['chip_am_premium_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100324', description: 'CHIP AM PREMIUN DARK ROASTEDMTEVOAK', images: ['chip_am_premiun_dark_roastedmtevoak.jpeg'], category: 'submenu1' },
  { code: 'GEN0100075', description: 'CHIP AM PURE 2 VAINILLA MT EVOAK', images: ['chip_am_pure_2_vainilla_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100077', description: 'CHIP AM TOASTED MT OAK MOR', images: ['chip_am_toasted_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100101', description: 'CHIP FR & AM PEÑAFLOR BLEND MTEVOAK', images: ['chip_fr_am_penaflor_blend_mtevoak.jpeg'], category: 'submenu1' },
  { code: 'GEN0100111', description: 'CHIP FR BLEND CHERRY ARONEO AROBOIS', images: ['chip_fr_blend_cherry_aroneo.jpeg'], category: 'submenu1' },
  { code: 'GEN0100360', description: 'CHIP FR BLEND FA AROBOIS', images: ['chip_fr_blend_fa_arobois.jpeg'], category: 'submenu1' },
  { code: 'GEN0100097', description: 'CHIP FR BOISÉ AFR LIGERO TOST VIVELYS', images: ['chip_fr_boise_afr_ligero_tost_vivelys.jpeg'], category: 'submenu1' },
  { code: 'GEN0100088', description: 'CHIP FR BOISÉ BF SIN TOSTAR VIVELYS', images: ['chip_fr_boise_bf_sin_tostar.jpeg'], category: 'submenu1' },
  { code: 'GEN0100089', description: 'CHIP FR BOISÉ DC 180 MT VIVELYS', images: ['chip_fr_boise_dc_180_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100090', description: 'CHIP FR BOISÉ DC 210 FT VIVELYS', images: ['chip_fr_boise_dc_210_ft.jpeg'], category: 'submenu1' },
  { code: 'GEN0100091', description: 'CHIP FR BOISÉ DC 310 FT VIVELYS', images: ['chip_fr_boise_dc_310_ft.jpeg'], category: 'submenu1' },
  { code: 'GEN0100093', description: 'CHIP FR BOISÉ ORIGINÉ SCA MT VIVELYS', images: ['chip_fr_boise_origine_sca_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100094', description: 'CHIP FR BOISÉ SC 180 MT VIVELYS', images: ['chip_fr_boise_sc_180_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100095', description: 'CHIP FR BOISÉ SC 180 XL MT VIVELYS', images: ['chip_fr_boise_sc_180_xl_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100105', description: 'CHIP FR CASERO MT QUERCUS', images: ['chip_fr_casero_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100082', description: 'CHIP FR COMPLEX MT OAKVIN', images: ['chip_fr_complex_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100103', description: 'CHIP FR CONVENTION TOAST OAKVIN', images: ['chip_fr_convention_toast.jpeg'], category: 'submenu1' },
  { code: 'GEN01002010', description: 'CHIP FR DULZOR ARONEO AROBOIS', images: ['chip_fr_dulzor_aroneo.jpeg'], category: 'submenu1' },
  { code: 'GEN0100223', description: 'CHIP FR EQUILIBRE ARONEO AROBOIS', images: ['chip_fr_equilibre_aroneo.jpeg'], category: 'submenu1' },
  { code: 'GEN0100087', description: 'CHIP FR FRESCOR ARONEO AROBOIS', images: ['chip_fr_frescor_aroneo.jpeg'], category: 'submenu1' },
  { code: 'GEN0100248', description: 'CHIP FR HIGH CARAMEL MT EVOAK', images: ['chip_fr_high_caramel_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100072', description: 'CHIP FR HIGH MOCHA MT EVOAK', images: ['chip_fr_high_mocha_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100073', description: 'CHIP FR HIGH SPICE MT EVOAK', images: ['chip_fr_high_spice_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100102', description: 'CHIP FR HIGH VAINILLA MT EVOAK', images: ['chip_fr_high_vainilla_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100325', description: 'CHIP FR INCANTO VAINILLA LIGMTOAK', images: ['chip_fr_incanto_vainilla_ligmtoak.jpeg'], category: 'submenu1' },
  { code: 'GEN0100099', description: 'CHIP FR MT CANADELL', images: ['chip_fr_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100226', description: 'CHIP FR MT TOSTADO MEDIO MT AROBOIS', images: ['chip_fr_mt_tostado_medio_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN01002016', description: 'CHIP FR NOBILE CHERRY SPYCE', images: ['chip_fr_nobile_cherry_spyce.jpeg'], category: 'submenu1' },
  { code: 'GEN0100290', description: 'CHIP FR OAK MT OAK', images: ['chip_fr_oak_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100104', description: 'CHIP FR QUERCUS MT', images: ['chip_fr_quercus_quercus_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100106', description: 'CHIP FR RIZZO MIX MURUA MT', images: ['chip_fr_rizzo_mix_murua_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100098', description: 'CHIP FR TABACO MT CANADELL', images: ['chip_fr_tabaco_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100349', description: 'CHIP FR XT 4 MT EVOAK', images: ['chip_fr_xt_4_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100113', description: 'CL ANTIBOTRYTIS MAX AEB', images: ['cl_antibotrytis_max.jpeg'], category: 'submenu1' },
  { code: 'GEN0100112', description: 'CL ANTIBOTRYTIS VARIETAL AEB', images: ['cl_antibotrytis_varietal.jpeg'], category: 'submenu1' },
  { code: 'GEN0100220', description: 'CL BENTONITA BENTOGRAN', images: ['cl_bentonita_bentogran.jpeg'], category: 'submenu1' },
  { code: 'GEN0100115', description: 'CL BENTONITA BLANCOBENT AMG', images: ['cl_bentonita_blancobent.jpeg'], category: 'submenu1' },
  { code: 'GEN0100116', description: 'CL BENTONITA FERMOBENT AMG', images: ['cl_bentonita_fermobent.jpeg'], category: 'submenu1' },
  { code: 'GEN0100117', description: 'CL BENTONITA LA ELCHA BOUILLARD', images: ['cl_bentonita_la_elcha.jpeg'], category: 'submenu1' },
  { code: 'GEN0100118', description: 'CL BENTONITA MAJORBENTON AEB', images: ['cl_bentonita_majorbenton.jpeg'], category: 'submenu1' },
  { code: 'GEN0100119', description: 'CL BENTONITA NACALIT AMG', images: ['cl_bentonita_nacalit.jpeg'], category: 'submenu1' },
  { code: 'GEN0100222', description: 'CL CARBON ACT. CARBOCROMO', images: ['cl_carbon_act_carbocromo.jpeg'], category: 'submenu1' },
  { code: 'GEN0100120', description: 'CL CARBON ACT. DEODAL AEB', images: ['cl_carbon_act_deodal.jpeg'], category: 'submenu1' },
  { code: 'GEN0100221', description: 'CL CARBON ACT. FPS', images: ['cl_carbon_act_fps.jpeg'], category: 'submenu1' },
  { code: 'GEN0100123', description: 'CL CARBON ACT. QUITOSANO LALLEMAND', images: ['cl_carbon_act_quitosano.jpeg'], category: 'submenu1' },
  { code: 'GEN0100121', description: 'CL CARBON ACT. SERIE ROJA BOUILLARD', images: ['cl_carbon_act_serie_roja.jpeg'], category: 'submenu1' },
  { code: 'GEN0100352', description: 'CL CLARIFICANTE M MENO AEB', images: ['cl_clarificante_m_meno.jpeg'], category: 'submenu1' },
  { code: 'GEN0100128', description: 'CL GEL DE SILICE SPINDASOL AEB', images: ['cl_gel_de_silice_spindasol.jpeg'], category: 'submenu1' },
  { code: 'GEN0100131', description: 'CL PROT. VEG LITTOFRESH ORIGINAMG', images: ['cl_prot_veg_littofresh_originamg.jpeg'], category: 'submenu1' },
  { code: 'GEN0100138', description: 'CL PROT. VEG. LITTOFRESH IMPACAMG', images: ['cl_prot_veg_littofresh_impacamg.jpeg'], category: 'submenu1' },
  { code: 'GEN0100132', description: 'CL PROT. VEG. VE GEL AEB', images: ['cl_prot_veg_ve_gel.jpeg'], category: 'submenu1' },
  { code: 'GEN0120013', description: 'CREMOR TARTARO DERVINSA', images: ['cremor_tartaro.jpeg'], category: 'submenu1' },
  { code: 'GEN0120086', description: 'DEACID AEB', images: ['deacid.jpeg'], category: 'submenu1' },
  { code: 'GEN0120040', description: 'DIVERGAN', images: ['divergan.jpeg'], category: 'submenu1' },
  { code: 'GEN0100271', description: 'DUELAS AM OENOSTAVE 7MM MT OENOSTAVE', images: ['duelas_am_oenostave_7mm_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100275', description: 'DUELAS FR LAT 44° BORDEAUX MT EVOAK', images: ['duelas_fr_lat_44_bordeaux_mt_evoak.jpeg'], category: 'submenu1' },
  { code: 'GEN0100276', description: 'DUELAS FR LAT 45° RHONE MT EVOAK', images: ['duelas_fr_lat_45_rhone_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100277', description: 'DUELAS FR LAT 46° BURGUNDY MT EVOAK', images: ['duelas_fr_lat_46_burgundy_mt_evoak.jpeg'], category: 'submenu1' },
  { code: 'GEN0100328', description: 'GOMA ARABIGA CITROGUM', images: ['goma_arabiga_citrogum.jpeg'], category: 'submenu1' },
  { code: 'GEN0120228', description: 'GOMA ARABIGA LIQUIDA', images: ['goma_arabiga_liquida.jpeg'], category: 'submenu1' },
  { code: 'IAD0040004', description: 'METABISULFITO DE POTASIO', images: ['metabisulfito_de_potasio.jpeg'], category: 'submenu1' },
  { code: 'IAD0040003', description: 'METABISULFITO DE SODIO', images: ['metabisulfito_de_sodio.jpeg'], category: 'submenu1' },
  { code: 'GEN0100245', description: 'MINI DU AM CUVÉE N° 2 MT EVOAK', images: ['mini_du_am_cuvee_n_2_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100203', description: 'MINI DU AM NATUDUELA MT OAK', images: ['mini_du_am_natuduela_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100247', description: 'MINI DU AM PURE 2 HIGH VAIN MTEVOAK', images: ['mini_du_am_pure_2_high_vain_mtevoak.jpeg'], category: 'submenu1' },
  { code: 'GEN0100230', description: 'MINI DU AM RICK HOUSE MT EVOAK', images: ['mini_du_am_rick_house_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100229', description: 'MINI DU AM SWEET SHOPPE MT EVOAK', images: ['mini_du_am_sweet_shoppe_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100206', description: 'MINI DU FR 18 DIVINE ALTO TOSTNOBILE', images: ['mini_du_fr_18_divine_alto_tostnobile.jpeg'], category: 'submenu1' },
  { code: 'GEN0100158', description: 'MINI DU FR 45° RHONE MT EVOAK', images: ['mini_du_fr_45_rhone_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100159', description: 'MINI DU FR 46° BURGUNDY MT EVOAK', images: ['mini_du_fr_46_burgundy_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100207', description: 'MINI DU FR BLOCK 47 ARMONÍA AROBOIS', images: ['mini_du_fr_block_47_armonia.jpeg'], category: 'submenu1' },
  { code: 'GEN0100246', description: 'MINI DU FR BLOCK 47 MT+ AROBOIS', images: ['mini_du_fr_block_47_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN01002012', description: 'MINI DU FR CREATIVE OAK SPICY OAK', images: ['mini_du_fr_creative_oak_spicy_oak.jpeg'], category: 'submenu1' },
  { code: 'GEN01002013', description: 'MINI DU FR ELITE DOBLE TOSTADONOBILE', images: ['mini_du_fr_elite_doble_tostadonobile.jpeg'], category: 'submenu1' },
  { code: 'GEN0100329', description: 'MINI DU FR FIRE TOAST', images: ['mini_du_fr_fire_toast.jpeg'], category: 'submenu1' },
  { code: 'GEN01002014', description: 'MINI DU FR FRESH MT NOBILE', images: ['mini_du_fr_fresh_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100150', description: 'MINI DU FR FRUITE MT TRUTAN', images: ['mini_du_fr_fruite_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100330', description: 'MINI DU FR INFRARROJO', images: ['mini_du_fr_infrarrojo.jpeg'], category: 'submenu1' },
  { code: 'GEN0100204', description: 'MINI DU FR INTENSE MT NOBILE', images: ['mini_du_fr_intense_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN01002011', description: 'MINI DU FR MT CANADELL', images: ['mini_du_fr_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN01002015', description: 'MINI DU FR NANO STAVES F0 MT OAKVIN', images: ['mini_du_fr_nano_staves_f0_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN0100255', description: 'MINI DU FR OAK SEARCH MT QUERCUS', images: ['mini_du_fr_oak_search_mt.jpeg'], category: 'submenu1' },
  { code: 'GEN01002017', description: 'MINI DU FR QUATTRO XTRACHENE', images: ['mini_du_fr_quattro.jpeg'], category: 'submenu1' },
  { code: 'GEN0100205', description: 'MINI DU FR REVELATION ALTO TOSNOBILE', images: ['mini_du_fr_revelation_alto_tosnobile.jpeg'], category: 'submenu1' },
  { code: 'GEN01002018', description: 'MINI DU FR TERROIR XTRACHENE', images: ['mini_du_fr_terroir.jpeg'], category: 'submenu1' },
  { code: 'GEN01002043', description: 'NUTRIENTES RESKUE LALLEMAND', images: ['nutrientes_reskue.jpeg'], category: 'submenu1' },
  { code: 'IAD0100003', description: 'SODA CAUSTICA', images: ['soda_caustica.jpeg'], category: 'submenu1' },
  { code: 'VMG0200024', description: 'SODA CAUSTICA', images: ['soda_caustica.jpeg'], category: 'submenu1' },
  { code: 'GEN0120119', description: 'SOLUC. BASE POLIASPART POTASIO', images: ['soluc_base_poliaspart_potasio.jpeg'], category: 'submenu1' },
  { code: 'GEN0100313', description: 'TIERRA DOSIF. CELITE 505', images: ['tierra_dosif_celite_505.jpeg'], category: 'submenu1' },
  { code: 'GEN0100239', description: 'TIERRA DOSIF. DIACTIV 14', images: ['tierra_dosif_diactiv_14.jpeg'], category: 'submenu1' },
  { code: 'IAD0070219', description: 'TIERRA DOSIF. DIACTIV MICROFILIMERYS', images: ['tierra_dosif_diactiv_microfilimerys.jpeg'], category: 'submenu1' },
  { code: 'GEN0110027', description: 'TIERRA DOSIFICACION', images: ['tierra_dosificacion.jpeg'], category: 'submenu1' },
  { code: 'GEN0100238', description: 'TIERRA PREC. DIACTIV 12H', images: ['tierra_prec_diactiv_12h.jpeg'], category: 'submenu1' },
  { code: 'GEN0100237', description: 'TIERRA PREC. DIACTIV 14H', images: ['tierra_prec_diactiv_14h.jpeg'], category: 'submenu1' },
  { code: 'GEN0110018', description: 'TIERRA PRECAPA', images: ['tierra_precapa.jpeg'], category: 'submenu1' },
  { code: 'GEN0110103', description: 'PERLITA FILTRANTE', images: ['perlita_filtrante.jpeg'], category: 'submenu1' },

  // Insumos Enológicos 2
  { code: 'GEN0100129', description: 'CL PROT. VEG. FITOPROTEINA P VASON', images: ['cl_prot_veg_fitoproteina_p.jpeg'], category: 'submenu2' },
  { code: 'GEN0080172', description: 'CL PROT. VEG. FITOPROTEINA XP VASON', images: ['cl_prot_veg_fitoproteina_xp.jpeg'], category: 'submenu2' },
  { code: 'GEN0100136', description: 'BACTERIA CINE CHR HANSEN', images: ['bacteria_cine_chr_hansen.jpeg'], category: 'submenu2' },
  { code: 'GEN0100215', description: 'BACTERIA CH 35 CHR HANSEN', images: ['bacteria_chr_35.jpeg'], category: 'submenu2' },
  { code: 'GEN0100137', description: 'BACTERIA OMEGA LALLEMAND', images: ['bacteria_omega.jpeg'], category: 'submenu2' },
  { code: 'GEN0100162', description: 'ENZ BL PECTOFLOT AEB', images: ['enz_bl_pectoflot.jpeg'], category: 'submenu2' },
  { code: 'GEN0100163', description: 'ENZ BL ZIMACLAR FLOT VASON', images: ['enz_bl_zimaclar_flot.jpeg'], category: 'submenu2' },
  { code: 'GEN0100168', description: 'ENZ TI ENDOZYM THERMOSTEP 1 AEB', images: ['enz_ti_endozym_thermostep_1.jpeg'], category: 'submenu2' },
  { code: 'GEN0100167', description: 'ENZ TI TRENOLIN THERMO STAB AMG', images: ['enz_ti_trenolin_thermo_stab.jpeg'], category: 'submenu2' },
  { code: 'GEN0100184', description: 'LEVADURA ALCHEMY I DUROX', images: ['levadura_alchemy_i.jpeg'], category: 'submenu2' },
  { code: 'GEN0100190', description: 'LEVADURA CS2 DUROX', images: ['levadura_cs2.jpeg'], category: 'submenu2' },
  { code: 'GEN0100191', description: 'LEVADURA CY3079 LALLEMAND', images: ['levadura_cy3079.jpeg'], category: 'submenu2' },
  { code: 'GEN0100195', description: 'LEVADURA ELIXIR LALLEMAND', images: ['levadura_elixir.jpeg'], category: 'submenu2' },
  { code: 'GEN0100346', description: 'LEVADURA FERMOL LIME AEB', images: ['levadura_fermol_lime.jpeg'], category: 'submenu2' },
  { code: 'GEN0100201', description: 'LEVADURA FUSION CERSA', images: ['levadura_fusion.jpeg'], category: 'submenu2' },
  { code: 'IAD0070220', description: 'LEVADURA LAKTIA LALLEMAND', images: ['levadura_laktia.jpeg'], category: 'submenu2' },
  { code: 'GEN0100345', description: 'LEVADURA NCB LALLEMAND', images: ['levadura_ncb.jpeg'], category: 'submenu2' },
  { code: 'IAD0070224', description: 'LEVADURA PERSY LALLEMAND', images: ['levadura_persy.jpeg'], category: 'submenu2' },
  { code: 'IAD0070228', description: 'LEVADURA RHONE 4600 LALLEMAND', images: ['levadura_rhone_4600.jpeg'], category: 'submenu2' },
  { code: 'IAD0070230', description: 'LEVADURA SAUVY LALLEMAND', images: ['levadura_sauvy.jpeg'], category: 'submenu2' },
  { code: 'IAD0120149', description: 'LEVADURA VIN 13', images: ['levadura_vin_13.jpeg'], category: 'submenu2' },
  { code: 'IAD0070233', description: 'LEVADURA VIN 7 DUROX', images: ['levadura_vin_7.jpeg'], category: 'submenu2' },
  { code: 'GEN0100362', description: 'LEVADURA ZYMAFLORE RX60 LAFFORT', images: ['levadura_zymaflore_rx60.jpeg'], category: 'submenu2' },
  { code: 'GEN01002030', description: 'NUTRIENTES GLUTASTAR LALLEMAND', images: ['nutrientes_glutastar.jpeg'], category: 'submenu2' },
  { code: 'GEN01002045', description: 'NUTRIENTES STIMULA SB', images: ['nutrientes_stimula_sb.jpeg'], category: 'submenu2' },
  { code: 'GEN0100213', description: 'NUTRIENTES STIMULA SY', images: ['nutrientes_stimula_sy.jpeg'], category: 'submenu2' },
  { code: 'GEN0100216', description: 'TAN TI CASTANEA', images: ['tan_ti_castanea.jpeg'], category: 'submenu2' },
  { code: 'GEN0100218', description: 'TAN TI TANETHYL UV', images: ['tan_ti_tanethyl_uv.jpeg'], category: 'submenu2' },
  { code: 'GEN0100219', description: 'TAN TI TRU TAN VF', images: ['tan_ti_tru_tan_vf.jpeg'], category: 'submenu2' },
  { code: 'GVA0130011', description: 'TAN TI VR COLOR LAFFORT', images: ['tan_ti_vr_color.jpeg', 'tan_ti_vr_color1.jpeg'], category: 'submenu2' },
  { code: 'GVA0130027', description: 'MANOPROTEINA', images: ['manoproteina.jpeg'], category: 'submenu2' },
  { code: 'GEN0100279', description: 'TANINO EASYTAN HARVEST SG VASON', images: ['tanino_easytan_harvest_sg.jpeg'], category: 'submenu2' },
  { code: 'IAD0170122', description: 'TANINO VR SUPRA', images: ['tanino_vr_supra.jpeg'], category: 'submenu2' },
  { code: 'GEN0100114', description: 'CL ANTIBOTRYTIS ROUGE AEB', images: ['cl_antibotrytis_rouge.jpeg'], category: 'submenu2' },
  { code: 'GEN0100126', description: 'CL CLARIFICANTE VINICLAR P LAFFORT', images: ['cl_clarificante_viniclar_p.jpeg'], category: 'submenu2' },
  { code: 'GEN0100170', description: 'ENZ BL EXTRALYSE LAFFORT', images: ['enz_bl_extralypse.jpeg'], category: 'submenu2' },
  { code: 'GEN0100161', description: 'ENZ BL NATUZYM MAX ULTRA WEISS', images: ['enz_bl_natuzym_max_ultra.jpeg'], category: 'submenu2' },
  { code: 'GEN0100173', description: 'ENZ TI LALLZYME EX LALLEMAND', images: ['enz_ti_lallzyme_ex.jpeg'], category: 'submenu2' },
  { code: 'GEN0100175', description: 'ENZ TI RAPIDASE FAST COLOR DUROX', images: ['enz_ti_rapidase_fast_color.jpeg'], category: 'submenu2' },
  { code: 'GEN0100176', description: 'ENZ TI RAPIDASE THERMO FLASH DUROX', images: ['enz_ti_rapidase_thermo_flash.jpeg'], category: 'submenu2' },
  { code: 'GEN0100178', description: 'ENZ TI ROHAPECT MA PLUS HC CERSA', images: ['enz_ti_rohapect_ma_plus_hc.jpeg'], category: 'submenu2' },
  { code: 'GEN0100210', description: 'ENZ TI ENDOZYM ROUGE', images: ['enz_ti_endozym_rouge.jpeg'], category: 'submenu2' },
  { code: 'GEN0100166', description: 'ENZ TI TRENOLIN ROUGE AMG', images: ['enz_ti_trenolin_rouge.jpeg'], category: 'submenu2' },
  { code: 'GEN0100183', description: 'LEVADURA 18 2007 DUROX', images: ['levadura_18_2007.jpeg'], category: 'submenu2' },
  { code: 'GEN0100227', description: 'LEVADURA 796', images: ['levadura_796.jpeg'], category: 'submenu2' },
  { code: 'GEN0100185', description: 'LEVADURA ALCHEMY II DUROX', images: ['levadura_alchemy_ii.jpeg'], category: 'submenu2' },
  { code: 'GEN0100284', description: 'LEVADURA ALCHEMY III', images: ['levadura_alchemy_iii.jpeg'], category: 'submenu2' },
  { code: 'GEN0100285', description: 'LEVADURA ALCHEMY IV', images: ['levadura_alchemy_iv.jpeg'], category: 'submenu2' },
  { code: 'GEN0100187', description: 'LEVADURA AMH DUROX', images: ['levadura_amh.jpeg'], category: 'submenu2' },
  { code: 'GEN0100188', description: 'LEVADURA B2000 DUROX', images: ['levadura_b2000.jpeg'], category: 'submenu2' },
  { code: 'GEN0100280', description: 'LEVADURA BC S103', images: ['levadura_bc_s103.jpeg'], category: 'submenu2' },
  { code: 'GEN0100303', description: 'LEVADURA CK S102', images: ['levadura_ck_s102.jpeg'], category: 'submenu2' },
  { code: 'GEN0100194', description: 'LEVADURA EC1118 LALLEMAND', images: ['levadura_ec1118.jpeg'], category: 'submenu2' },
  { code: 'GEN0100196', description: 'LEVADURA F15 LAFFORT', images: ['levadura_f15.jpeg'], category: 'submenu2' },
  { code: 'GEN0100197', description: 'LEVADURA FERMOL AROME PLUS AEB', images: ['levadura_fermol_arome_plus.jpeg'], category: 'submenu2' },
  { code: 'GEN0100199', description: 'LEVADURA FLAVIA LALLEMAND', images: ['levadura_flavia.jpeg'], category: 'submenu2' },
  { code: 'GEN0100200', description: 'LEVADURA FREDDO AMG', images: ['levadura_freddo.jpeg'], category: 'submenu2' },
  { code: 'GEN0100286', description: 'LEVADURA IOC BE THIOLS', images: ['levadura_ioc_be_thiols.jpeg'], category: 'submenu2' },
  { code: 'GEN0100202', description: 'LEVADURA IONYS LALLEMAND', images: ['levadura_ionys.jpeg'], category: 'submenu2' },
  { code: 'IAD0070223', description: 'LEVADURA OPALE LALLEMAND', images: ['levadura_opale.jpeg'], category: 'submenu2' },
  { code: 'IAD0070225', description: 'LEVADURA PREMIER BLANC FERMENTIS', images: ['levadura_premier_blanc.jpeg'], category: 'submenu2' },
  { code: 'IAD0120154', description: 'LEVADURA QA23', images: ['levadura_qa23.jpeg'], category: 'submenu2' },
  { code: 'IAD0070229', description: 'LEVADURA RP15 DUROX', images: ['levadura_rp15.jpeg'], category: 'submenu2' },
  { code: 'IAD0070231', description: 'LEVADURA SENSY LALLEMAND', images: ['levadura_sensy.jpeg'], category: 'submenu2' },
  { code: 'IAD0120132', description: 'LEVADURA UVAFERM 43 RESTART', images: ['levadura_uvaferm_43_restart.jpeg'], category: 'submenu2' },
  { code: 'GEN0100273', description: 'LEVADURA UVAFERM 43 YSEO', images: ['levadura_uvaferm_43_yseo.jpeg'], category: 'submenu2' },
  { code: 'IAD0070221', description: 'LEVADURA VITILEVURE MT DUROX', images: ['levadura_vitilevure_mt.jpeg'], category: 'submenu2' },
  { code: 'GEN0100281', description: 'LEVADURA VR44', images: ['levadura_vr44.jpeg'], category: 'submenu2' },
  { code: 'IAD0070235', description: 'LEVADURA X5 LAFFORT', images: ['levadura_x5.jpeg'], category: 'submenu2' },
  { code: 'GEN0100258', description: 'LEVADURA ZYMAFLORE FX 10', images: ['levadura_zymaflore_fx_10.jpeg'], category: 'submenu2' },
  { code: 'GEN0100283', description: 'LEVADURA ZYMAFLORE X16', images: ['levadura_zymaflore_x16.jpeg'], category: 'submenu2' },
  { code: 'GEN0100189', description: 'LEVADURA ZYMASIL BGV AEB', images: ['levadura_zymasil_bgv.jpeg'], category: 'submenu2' },
  { code: 'GEN0100141', description: 'NUTRIENTE STIMULA MALBEC', images: ['nutriente_stimula_malbec.jpeg'], category: 'submenu2' },
  { code: 'GEN0100334', description: 'NUTRIENTE TIAMINA GENÉRICO', images: ['nutriente_tiamina.jpeg'], category: 'submenu2' },
  { code: 'GEN0100212', description: 'NUTRIENTES ENOVIT P', images: ['nutrientes_enovit_p.jpeg'], category: 'submenu2' },
  { code: 'GEN01002022', description: 'NUTRIENTES EXTRA FERM DUROX', images: ['nutrientes_extra_ferm.jpeg'], category: 'submenu2' },
  { code: 'GEN01002023', description: 'NUTRIENTES FERMAID AT LALLEMAND', images: ['nutrientes_fermaid_at.jpeg'], category: 'submenu2' },
  { code: 'GEN01002024', description: 'NUTRIENTES FERMAID K LALLEMAND', images: ['nutrientes_fermaid_k.jpeg'], category: 'submenu2' },
  { code: 'GEN01002025', description: 'NUTRIENTES FERMAID O LALLEMAND', images: ['nutrientes_fermaid_o.jpeg'], category: 'submenu2' },
  { code: 'GEN01002026', description: 'NUTRIENTES FERMOPLUS CH AEB', images: ['nutrientes_fermoplus_ch.jpeg'], category: 'submenu2' },
  { code: 'GEN01002028', description: 'NUTRIENTES FERMOPLUS INTEGR. AEB', images: ['nutrientes_fermoplus_integr.jpeg'], category: 'submenu2' },
  { code: 'GEN01002032', description: 'NUTRIENTES GOFERM P EVOL LALLEMAND', images: ['nutrientes_goferm_p_evol.jpeg'], category: 'submenu2' },
  { code: 'GEN0100307', description: 'NUTRIENTES GOFERM STEROL FLASHNUTRIENTE MAYOR A 20 USD/KG', images: ['nutrientes_goferm_sterol_flashnutriente_mayor_a_20_usd_kg.jpeg'], category: 'submenu2' },
  { code: 'GEN01002033', description: 'NUTRIENTES LEV 2050 WINE SOLUTION', images: ['nutrientes_lev_2050.jpeg'], category: 'submenu2' },
  { code: 'GEN01002042', description: 'NUTRIENTES OPTIMUM WHITE LALLEMAND', images: ['nutrientes_optimum_white.jpeg'], category: 'submenu2' },
  { code: 'IAD0070226', description: 'NUTRIENTES PURE LESS LONGEVITYLALLEMAND', images: ['nutrientes_pure_less_longevitylallemand.jpeg'], category: 'submenu2' },
  { code: 'GEN0100293', description: 'NUTRIENTES STIMULA CB', images: ['nutrientes_stimula_cb.jpeg'], category: 'submenu2' },
  { code: 'GEN01002044', description: 'NUTRIENTES STIMULA CY LALLEMAND', images: ['nutrientes_stimula_cy.jpeg'], category: 'submenu2' },
  { code: 'GEN0100312', description: 'NUTRIENTES STIMULA PN', images: ['nutrientes_stimula_pn.jpeg'], category: 'submenu2' }
];

type ViewType = 'main' | 'category' | 'product' | 'summary';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [selectedCategory, setSelectedCategory] = useState<'submenu1' | 'submenu2' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([]);
  const [showStockForm, setShowStockForm] = useState(false);
  const [stockQuantity, setStockQuantity] = useState('');
  const [stockUnit, setStockUnit] = useState('kg');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter(product => 
      product.category === selectedCategory &&
      (product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [selectedCategory, searchTerm]);

  const handleCategorySelect = (category: 'submenu1' | 'submenu2') => {
    setSelectedCategory(category);
    setCurrentView('category');
    setSearchTerm('');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    setShowStockForm(false);
  };

  const handleAddStock = () => {
    if (!selectedProduct || !stockQuantity) return;

    const warehouseName = selectedCategory === 'submenu1' 
      ? 'Insumos Enológicos 1' 
      : 'Insumos Enológicos 2';

    const newEntry: StockEntry = {
      warehouse: warehouseName,
      code: selectedProduct.code,
      description: selectedProduct.description,
      quantity: parseFloat(stockQuantity),
      unit: stockUnit
    };

    setStockEntries(prev => [...prev, newEntry]);
    setStockQuantity('');
    setShowStockForm(false);
    alert('Stock ingresado correctamente');
  };

  const handleDownloadCSV = () => {
    const csvContent = '\uFEFF' + // BOM for UTF-8
      'Almacén;Código;Descripción;Cantidad;Unidad\n' +
      stockEntries.map(entry => 
        `${entry.warehouse};${entry.code};${entry.description};${entry.quantity};${entry.unit}`
      ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stock_enologicos.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderMainMenu = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <Wine className="w-16 h-16 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Insumos Enológicos</h1>
        <p className="text-xl text-gray-600">Almacén de Insumos - Grupo Peñaflor</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => handleCategorySelect('submenu1')}
          className="group bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Package className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mb-2">Insumos Enológicos 1</h3>
          <p className="text-purple-100 text-sm">Ácidos, chips, clarificantes y más</p>
        </button>

        <button
          onClick={() => handleCategorySelect('submenu2')}
          className="group bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Package className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mb-2">Insumos Enológicos 2</h3>
          <p className="text-indigo-100 text-sm">Levaduras, enzimas, nutrientes</p>
        </button>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setCurrentView('summary')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Confirmar Carga
        </button>
      </div>
    </div>
  );

  const renderCategoryView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentView('main')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al menú principal
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {selectedCategory === 'submenu1' ? 'Insumos Enológicos 1' : 'Insumos Enológicos 2'}
        </h2>
        <p className="text-gray-600">
          {filteredProducts.length} productos disponibles
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por código o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
        : "space-y-2"
      }>
        {filteredProducts.map((product) => (
          <button
            key={product.code}
            onClick={() => handleProductSelect(product)}
            className={viewMode === 'grid' 
              ? "bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 text-left group"
              : "bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-purple-300 transition-all duration-300 text-left w-full flex items-center gap-4"
            }
          >
            <div className={viewMode === 'grid' ? "" : "flex-1"}>
              <div className="font-mono text-sm text-purple-600 font-semibold mb-1">
                {product.code}
              </div>
              <div className={`text-gray-800 font-medium ${viewMode === 'grid' ? 'text-sm' : 'text-base'} group-hover:text-purple-700 transition-colors`}>
                {product.description}
              </div>
            </div>
            {viewMode === 'list' && (
              <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
            )}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
        </div>
      )}
    </div>
  );

  const renderProductView = () => {
    if (!selectedProduct) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentView('category')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Atrás
          </button>
          <button
            onClick={() => setCurrentView('main')}
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            Volver al menú principal
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-mono text-sm font-semibold mb-4">
              {selectedProduct.code}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProduct.description}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {selectedProduct.images.map((image, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                <img
                  src={`https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop`}
                  alt={selectedProduct.description}
                  className="w-64 h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            {!showStockForm ? (
              <button
                onClick={() => setShowStockForm(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Stock Físico
              </button>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ingresar Stock</h3>
                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                  <select
                    value={stockUnit}
                    onChange={(e) => setStockUnit(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  >
                    <option value="kg">Kilogramos</option>
                    <option value="unidades">Unidades</option>
                    <option value="litros">Litros</option>
                  </select>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddStock}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Ingresar
                    </button>
                    <button
                      onClick={() => setShowStockForm(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSummaryView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setCurrentView('main')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Atrás
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Resumen de Stock</h2>
        <p className="text-gray-600">{stockEntries.length} entradas registradas</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {stockEntries.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Almacén</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Código</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Descripción</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cantidad</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stockEntries.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800">{entry.warehouse}</td>
                      <td className="px-6 py-4 text-sm font-mono text-purple-600 font-semibold">{entry.code}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{entry.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{entry.quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{entry.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-gray-50 text-center">
              <button
                onClick={handleDownloadCSV}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Descargar CSV
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No hay entradas de stock registradas</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {currentView === 'main' && renderMainMenu()}
        {currentView === 'category' && renderCategoryView()}
        {currentView === 'product' && renderProductView()}
        {currentView === 'summary' && renderSummaryView()}
      </div>
    </div>
  );
}

export default App;
