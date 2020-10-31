<template>
  <v-row justify="center">
    <v-dialog v-model="DialogThemSuaThe" persistent max-width="600px">
      <template>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{isUpdate? 'Cập nhật thẻ' : 'Thêm thẻ'}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6" class="py-0 px-2">
                <v-row>
                  <v-col cols="12" class="py-0 px-2">
                    <v-text-field v-model="TheDuocChon.HinhAnh" label="Hình ảnh*" required></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              
              <v-col cols="12" class="py-0 px-2">
                <v-row>
                  <v-col cols="12" md="6" class="py-0 px-2">
                    <v-text-field v-model="TheDuocChon.ThuatNgu" 
                    label="Thuat ngu" 
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="py-0 px-2">
                <v-row>
                  <v-col cols="12" md="6" class="py-0 px-2">
                    <v-text-field v-model="TheDuocChon.GiaiNghia" 
                    label="Giai nghia" 
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              
            </v-row>
          </v-container>
          <small>* Những trường bắt buộc</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="DialogThemSuaThe= false">Hủy</v-btn>
          <v-btn color="blue darken-1" text @click="save()">{{isUpdate? 'Cập nhật' : 'Thêm mới'}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
        isUpdate: false,
        DialogThemSuaThe: false, // dialog la cai cua so nho nho
        TheDuocChon:{},
        //dsLoaiSanPham:[],
        //dsNhaCungCap:[],
        //dsDonViTinh:[],
    }),
    methods:{
        ShowDialogThemSuaThe(item, isUpdate) {
        this.isUpdate = isUpdate;
        this.DialogThemSuaThe = true;
        if(this.isUpdate == true){
          this.getTheLenDialog(item.TheID);
        }
        else{
          this.TheDuocChon = {}
        }
        
        },
        
    }
  }
</script>