
import React from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Trash2, Edit3, Eye, EyeOff, Download, Upload } from 'lucide-react';

interface BulkActionsToolbarProps {
  selectedItems: string[];
  totalItems: number;
  onSelectAll: (checked: boolean) => void;
  onBulkDelete: () => void;
  onBulkEnable: () => void;
  onBulkDisable: () => void;
  onExport: () => void;
  onImport: () => void;
  isAllSelected: boolean;
}

const BulkActionsToolbar: React.FC<BulkActionsToolbarProps> = ({
  selectedItems,
  totalItems,
  onSelectAll,
  onBulkDelete,
  onBulkEnable,
  onBulkDisable,
  onExport,
  onImport,
  isAllSelected
}) => {
  const hasSelection = selectedItems.length > 0;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={onSelectAll}
          aria-label="تحديد الكل"
        />
        <span className="text-sm text-gray-600">
          {selectedItems.length > 0 
            ? `تم تحديد ${selectedItems.length} من ${totalItems} عنصر`
            : `${totalItems} عنصر`
          }
        </span>
      </div>

      <div className="flex items-center gap-2">
        {hasSelection && (
          <>
            <Button
              onClick={onBulkEnable}
              size="sm"
              variant="outline"
              className="text-green-600 hover:text-green-700"
            >
              <Eye className="w-4 h-4 ml-2" />
              تفعيل المحدد
            </Button>
            <Button
              onClick={onBulkDisable}
              size="sm"
              variant="outline"
              className="text-orange-600 hover:text-orange-700"
            >
              <EyeOff className="w-4 h-4 ml-2" />
              إلغاء التفعيل
            </Button>
            <Button
              onClick={onBulkDelete}
              size="sm"
              variant="destructive"
            >
              <Trash2 className="w-4 h-4 ml-2" />
              حذف المحدد
            </Button>
          </>
        )}
        
        <div className="h-4 w-px bg-gray-300 mx-2" />
        
        <Button
          onClick={onExport}
          size="sm"
          variant="outline"
        >
          <Download className="w-4 h-4 ml-2" />
          تصدير
        </Button>
        <Button
          onClick={onImport}
          size="sm"
          variant="outline"
        >
          <Upload className="w-4 h-4 ml-2" />
          استيراد
        </Button>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;
